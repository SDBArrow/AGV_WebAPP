/**
 * @author Russell Toris - rctoris@wpi.edu
 * @author Lars Kunze - l.kunze@cs.bham.ac.uk
 * @author Raffaello Bonghi - raffaello.bonghi@officinerobotiche.it
 */

/**
 * A navigator can be used to add click-to-navigate options to an object. If
 * withOrientation is set to true, the user can also specify the orientation of
 * the robot by clicking at the goal position and pointing into the desired
 * direction (while holding the button pressed).
 *
 * @constructor
 * @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * tfClient (optional) - the TF client
 *   * robot_pose (optional) - the robot topic or TF to listen position
 *   * serverName (optional) - the action server name to use for navigation, like '/move_base'
 *   * actionName (optional) - the navigation action name, like 'move_base_msgs/MoveBaseAction'
 *   * rootObject (optional) - the root object to add the click listeners to and render robot markers to
 *   * withOrientation (optional) - if the Navigator should consider the robot orientation (default: false)
 */
//import Test3 from '../../../../src/Component/Test3'
NAV2D.Navigator = function (options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var tfClient = options.tfClient || null;
  var robot_pose = options.robot_pose || "/robot_pose";
  var serverName = options.serverName || "/move_base";
  var actionName = options.actionName || "move_base_msgs/MoveBaseAction";
  var withOrientation = options.withOrientation || false;
  var use_image = options.image;
  this.rootObject = options.rootObject || new createjs.Container();

  this.goalMarker = null;

  var currentGoal;

  // setup the actionlib client
  var actionClient = new ROSLIB.ActionClient({
    ros: ros,
    actionName: actionName,
    serverName: serverName,
  });

  /**
   * 向 move_base 發送一個 goal
   * Send a goal to the navigation stack with the given pose.
   *
   * @param pose - the goal pose
   */
  function sendGoal(pose) {
    //清除子圖
    var clear_costmap = new window.ROSLIB.Service({
      ros: this.state.ros,
      name: "/move_base/clear_costmaps",
      messageType: 'std_srvs/Empty',
    });

    clear_costmap.callService("{}")

    var goal = new ROSLIB.Goal({
      actionClient: actionClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: "map",
          },
          pose: pose,
        },
      },
    });
    goal.send();

    that.currentGoal = goal;

    // 為設定的目標建立圖標
    // create a marker for the goal  
    if (that.goalMarker === null) {
      if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
        that.goalMarker = new ROS2D.ImageNavigator({
          size: 2.5,
          image: use_image,
          alpha: 0.7,
          pulse: true,
        });
      } else {
        that.goalMarker = new ROS2D.NavigationArrow({
          size: 15,
          strokeSize: 1,
          fillColor: createjs.Graphics.getRGB(255, 64, 128, 0.66),
          pulse: true,
        });
      }
      that.rootObject.addChild(that.goalMarker);
    }
    that.goalMarker.x = pose.position.x;
    that.goalMarker.y = -pose.position.y;
    that.goalMarker.rotation = stage.rosQuaternionToGlobalTheta(
      pose.orientation
    );
    that.goalMarker.scaleX = 1.0 / stage.scaleX;
    that.goalMarker.scaleY = 1.0 / stage.scaleY;

    goal.on("result", function () {
      that.rootObject.removeChild(that.goalMarker);
    });
  }
window.$sendGoal = sendGoal

  //座標存到資料庫
  function saveGoal(pose) {
    const data = { pose: pose, jwt: localStorage.getItem("jwt"), id_car_set: localStorage.getItem("id_car_set"), goal_name: localStorage.getItem("goal_name") }

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: JSON.stringify(data)
    };
    fetch('https://sign-register.herokuapp.com/create_goalset.php', requestOptions)
      .then(response => response.json())
      .then((responseJson) => {
        if(window.$callPopup) {
          window.$callPopup(responseJson.message)
        } else {
          console.log("no $callPopup func.")
        }
      })
  }

  /**
   * 取消當前的目標
   * Cancel the currently active goal. 
   */
  this.cancelGoal = function () {
    console.log("Cancel Goals");
    if (typeof that.currentGoal !== "undefined") {
      console.log(that.currentGoal);
      that.currentGoal.cancel();
    }
  };

  // get a handle to the stage
  var stage;
  if (that.rootObject instanceof createjs.Stage) {
    stage = that.rootObject;
  } else {
    stage = that.rootObject.getStage();
  }

  // 建立機器人的圖標
  // marker for the robot
  var robotMarker = null;
  if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
    robotMarker = new ROS2D.ImageNavigator({
      size: 2.5,
      image: use_image,
      pulse: true,
    });
  } else {
    robotMarker = new ROS2D.NavigationArrow({
      size: 25,
      strokeSize: 1,
      fillColor: createjs.Graphics.getRGB(255, 128, 0, 0.66),
      pulse: true,
    });
  }

  // wait for a pose to come in first
  robotMarker.visible = false;
  this.rootObject.addChild(robotMarker);
  var initScaleSet = false;

  var updateRobotPosition = function (pose, orientation) {
    // 更新機器人在地圖的座標
    // update the robots position on the map 
    robotMarker.x = pose.x;
    robotMarker.y = -pose.y;
    console.log(initScaleSet);
    if (!initScaleSet) {
      robotMarker.scaleX = 1.0 / stage.scaleX;
      robotMarker.scaleY = 1.0 / stage.scaleY;
      initScaleSet = true;
    }
    // change the angle 
    robotMarker.rotation = stage.rosQuaternionToGlobalTheta(orientation);
    // Set visible
    robotMarker.visible = true;
  };

  if (tfClient !== null) {
    tfClient.subscribe(robot_pose, function (tf) {
      updateRobotPosition(tf.translation, tf.rotation);
    });
  } else {
    // subscribe 機器人的pose
    // setup a listener for the robot pose  
    var poseListener = new ROSLIB.Topic({
      ros: ros,
      name: robot_pose,
      messageType: "geometry_msgs/Pose",
      throttle_rate: 100,
    });
    poseListener.subscribe(function (pose) {
      //console.log(pose.position);
      //console.log(pose.orientation);

      //console.log(that.rootObject);
      //console.log(robotMarker);
      //console.log("add robot marker");
      updateRobotPosition(pose.position, pose.orientation);
    });
  }
  //點擊後監聽器轉換為ros座標
  if (withOrientation === false) {
    // 雙擊畫面
    // setup a double click listener (no orientation)
    this.rootObject.addEventListener("dblclick", function (event) {
      // convert to ROS coordinates
      var coords = stage.globalToRos(event.stageX, event.stageY);
      var pose = new ROSLIB.Pose({
        position: new ROSLIB.Vector3(coords),
      });
      // send the goal
      console.log("dblclick")
      console.log("mode：" + localStorage.getItem("mode"))
      var mode = localStorage.getItem("mode")
      if (mode == "true") {
      } else if (mode == "false") {
        //sendGoal(pose);
      }
    });
  } else {
    // withOrientation === true
    // setup a click-and-point listener (with orientation)
    var position = null;
    var positionVec3 = null;
    var thetaRadians = 0;
    var thetaDegrees = 0;
    var orientationMarker = null;
    var mouseDown = false;
    var xDelta = 0;
    var yDelta = 0;

    var mouseEventHandler = function (event, mouseState) {
      if (mouseState === "down") {
        // get position when mouse button is pressed down 滑鼠按下時獲得座標
        position = stage.globalToRos(event.stageX, event.stageY);
        positionVec3 = new ROSLIB.Vector3(position);
        mouseDown = true;
      } else if (mouseState === "move") {
        // remove obsolete orientation marker
        that.rootObject.removeChild(orientationMarker);

        if (mouseDown === true) {
          // if mouse button is held down: 如果鼠標按住
          // - get current mouse position  獲取當前鼠標位置
          // - calulate direction between stored <position> and current position 計算存儲的 <position> 和當前位置之間的方向
          // - place orientation marker 放置方向標記
          var currentPos = stage.globalToRos(event.stageX, event.stageY);
          var currentPosVec3 = new ROSLIB.Vector3(currentPos);

          if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
            orientationMarker = new ROS2D.ImageNavigator({
              size: 2.5,
              image: use_image,
              alpha: 0.7,
              pulse: false,
            });
          } else {
            orientationMarker = new ROS2D.NavigationArrow({
              size: 25,
              strokeSize: 1,
              fillColor: createjs.Graphics.getRGB(0, 255, 0, 0.66),
              pulse: false,
            });
          }

          xDelta = currentPosVec3.x - positionVec3.x;
          yDelta = currentPosVec3.y - positionVec3.y;

          thetaRadians = Math.atan2(xDelta, yDelta);

          thetaDegrees = thetaRadians * (180.0 / Math.PI);

          if (thetaDegrees >= 0 && thetaDegrees <= 180) {
            thetaDegrees += 270;
          } else {
            thetaDegrees -= 90;
          }

          orientationMarker.x = positionVec3.x;
          orientationMarker.y = -positionVec3.y;
          orientationMarker.rotation = thetaDegrees;
          orientationMarker.scaleX = 1.0 / stage.scaleX;
          orientationMarker.scaleY = 1.0 / stage.scaleY;

          that.rootObject.addChild(orientationMarker);
        }
      } else if (mouseDown) {
        // mouseState === 'up' 
        // if mouse button is released 如果鼠標按鈕被釋放
        // - get current mouse position (goalPos) 獲取當前鼠標位置 (goalPos)
        // - calulate direction between stored <position> and goal position 計算存儲的 <position> 和目標位置之間的方向
        // - set pose with orientation  設置帶有方向的姿勢
        // - send goal 發送目標
        mouseDown = false;

        var goalPos = stage.globalToRos(event.stageX, event.stageY);

        var goalPosVec3 = new ROSLIB.Vector3(goalPos);

        //計算orientation
        xDelta = goalPosVec3.x - positionVec3.x;
        yDelta = goalPosVec3.y - positionVec3.y;

        thetaRadians = Math.atan2(xDelta, yDelta);

        if (thetaRadians >= 0 && thetaRadians <= Math.PI) {
          thetaRadians += (3 * Math.PI) / 2;
        } else {
          thetaRadians -= Math.PI / 2;
        }

        var qz = Math.sin(-thetaRadians / 2.0);
        var qw = Math.cos(-thetaRadians / 2.0);

        var orientation = new ROSLIB.Quaternion({ x: 0, y: 0, z: qz, w: qw });

        var pose = new ROSLIB.Pose({
          position: positionVec3,
          orientation: orientation,
        });

        // send the goal
        var mode = localStorage.getItem("mode")
        if (mode == "true") {
          console.log("mouseDown")
          console.log("mode：" + localStorage.getItem("mode"))
          saveGoal(pose);
        } else if (mode == "false") {
          sendGoal(pose);
        }
      }
    };

    this.rootObject.addEventListener("stagemousedown", function (event) {
      mouseEventHandler(event, "down");
    });

    this.rootObject.addEventListener("stagemousemove", function (event) {
      mouseEventHandler(event, "move");
    });

    this.rootObject.addEventListener("stagemouseup", function (event) {
      mouseEventHandler(event, "up");
    });
  }
};

