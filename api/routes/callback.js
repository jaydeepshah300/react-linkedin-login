var express = require("express");
var router = express.Router();
const request = require("superagent");
require("dotenv").config();

/* Handle LinkedIn OAuth callback and return user profile. */
router.get("/", function (req, res, next) {
  requestAccessToken(req.query.code, req.query.state)
    .then((response) => {
      requestProfile(response.body.access_token).then((result) => {
        res.render("callback", { profile: result });
      });
    })
    .catch((error) => {
      res.status(500).send(`${error}`);
      console.error(error);
    });
});

function requestAccessToken(code, state) {
  return request
    .post("https://www.linkedin.com/oauth/v2/accessToken")
    .send("grant_type=authorization_code")
    .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
    .send(`client_id=${process.env.EXPRESS_APP_CLIENT_ID}`)
    .send(`client_secret=${process.env.EXPRESS_APP_CLIENT_SECRET}`)
    .send(`code=${code}`)
    .send(`state=${state}`);
}

const requestProfile = async (token) => {
  const profileInformation = await request
    .get(
      "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,email,profilePicture(displayImage~digitalmediaAsset:playableStreams))"
    )
    .set("Authorization", `Bearer ${token}`);

  const emailDetails = await request
    .get(
      // "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(true,EMAIL,handle~,emailAddress))"
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(true,EMAIL,handle~,emailAddress))"
    )
    .set("Authorization", `Bearer ${token}`);

  const finalResponse = {
    ...profileInformation.body,
    emailAddress: emailDetails.body.elements[0]["handle~"].emailAddress,
  };

  return finalResponse;
};

module.exports = router;
