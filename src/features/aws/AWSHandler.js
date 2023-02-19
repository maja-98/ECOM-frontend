import AWS from 'aws-sdk'


AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: 'ap-south-1',
  signatureVersion: 'v4',
});


  // const handleFileSelect = (e) => {
  //   setFile(e.target.files[0]);
  // }
export const uploadToS3 = async ({file}) => {
    const s3 = new AWS.S3();
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'dubaipardhas', 
      Key: `${Date.now()}-${file.name}`, 
      Body: file 
    };
    const { Location } = await s3.upload(params).promise();

    return Location
 }


