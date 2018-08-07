async function awsAnalysisAsync(bytes) {

  console.log("Sending data...");

  try{
    let response = await fetch('http://uassafeflightdevtest-env-1.dbmkyk9uby.us-east-1.elasticbeanstalk.com/api/getlabels_aws', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        image: bytes
      })
    });

    let responseJson = await response.json();
    console.log("data rx:" + responseJson);

    return responseJson.message;

  } catch (error) {
    console.log("error section...")
    console.error(error, response);
  }
}

export {awsAnalysisAsync};
