async function awsAnalysisAsync(bytes) {
  try{
    let response = await fetch('http://18.207.234.121:8080/api/getlabels_aws', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        image: bytes
      })
    });
    let responseJson = await response.json();
    return responseJson.message;
    } catch (error) {
    console.log("error section...")
    console.error(error, response);
  }
}

export {awsAnalysisAsync};
