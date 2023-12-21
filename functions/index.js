const functions = require("firebase-functions");

exports.scheduledFunction = functions.pubsub
  .schedule("every 1 minutes")
  .onRun((context) => {
    console.log("This function is running every minute!");
    logger.info("Hello logs!");
    // 여기에 원하는 로직을 추가합니다.
  });
