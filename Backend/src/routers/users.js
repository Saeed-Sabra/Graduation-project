const User = require("../models/user");
const MedInf = require("../models/medical information");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sendEmail = require("../emails/sendEmail");

router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);
  const email = req.body.email;
  try {
    if (!req.body.confirmPassword) {
      return res.status(400).send({ error: "Confirm password is required." });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ error: "Passwords do not match. Please try again." });
    }
    const token = jwt.sign({ email }, process.env.EMAILTOKEN, {
      expiresIn: "1h",
    });
    const link = `${req.protocol}://${req.headers.host}/users/confirmEmail/${token}`;
    // const link=`http://localhost:3001/confirmEmail/${token}`
    const html = `<head><style type="text/css" title="x-apple-mail-formatting"></style>
    <title>Typeform</title>
    <meta name="viewport" content="width = 375, initial-scale = -1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <link rel="stylesheet" href="https://font.typeform.com/dist/font-email.css">
    <style type="text/css">
		@font-face{font-family:apercu-pro;font-style:normal;font-weight:400;src:local("apercu-pro"),url(https://font.typeform.com/dist/fonts/ApercuPro-Regular.woff2) format("woff")}
		body,td{font-family:Arial,Helvetica,sans-serif}
		strong {
    font-weight: bold;}
		p{margin:0;padding:0 0 1em 0}
		a{text-decoration:none}
      	@media all and (max-width: 520px) {
              .hide_on_mobile{display:none !important}
			  .show_on_mobile{display:block !important;margin:auto !important; float:left !important}
              .fullwidth{width:100% !important;height:auto !important;min-width:100% !important;float:none !important}
              .padded{box-sizing:border-box;padding-left:10px !important;padding-right:10px !important}
              #logo{float:none !important}
              .button{font-size:16px !important}
			.content td{padding-right:10px !important}
          }
          @media screen{
              body,td{font-family:apercu-pro,sans-serif !important}
          }
    </style>
<style type="text/css">
</style>
<style type="text/css">
</style>
</head>
<body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" rightmargin="0" bottommargin="0" bgcolor="#FFFFFF" style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:none">
	<div style="display:none;font-size:1px;color:#FFFFFF;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden">
						<p>You registered an account on our website! , before being able to use your account you need to verify that this is your email address by clicking here.</p>
		    </div>
	  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FFFFFF" class="fullwidth">
      <tbody><tr>
        <td>
      		<table border="0" cellpadding="0" cellspacing="0" width="600" class="fullwidth" align="center" style="margin:auto">
        	<tbody>
            <tr>
              <td class="content">
				<div mc:repeatable="Hero Section">
					<table border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody><tr>
						<td style="padding:0 30px" class="padded">

							<table border="0" cellpadding="0" cellspacing="0" width="100%" class="fullwidth" style="border-bottom:1px solid #e7e7e7">
							<tbody><tr>
								<td style="padding:20px 0;text-align:left;font-weight:500;font-size:24px;color:#343333" class="avenir" mc:edit="title">Hello ${req.body.name},</td>
							  </tr>
							  <tr>
								<td style="padding:0 80px 0 0;font-size:18px;line-height:167%;font-weight:400;color:#343333" mc:edit="copy 1">
																						<p>You registered an account on our website! , 
                                            before being able to use your account you need to verify that this is your email address by clicking here.</p>
																		 </td>
							  </tr>
							  <tr>
								<td style="padding:30px 0 60px 0" mc:edit="button">
									<!--[if mso]><table border="0" cellpadding="0" cellspacing="0" align="left" bgcolor="#343333"><tr><td align="left"><![endif]-->
									<div align="left">
										<a data-qa="verification_link" href=${link} style="text-decoration:none;color:#FFFFFF;background-color:#343333;display:inline-block;padding:15px 20px;margin:auto;border:2px solid #343333;border-radius:3px;font-size:18px;font-weight:500" class="button">
																							Verify my email
																					</a>
									</div>
									<!--[if mso]></td></tr></table><![endif]-->
								</td>
							</tr>
							</tbody></table>
							<table border="0" cellpadding="0" cellspacing="0" width="100%" class="fullwidth">
							<tbody><tr>
								<td style="padding:20px 80px 0 0;font-size:16px;line-height:167%;font-weight:400;color:#343333" mc:edit="copy 2">
									<p>This link will self-destruct in 1 hours.<br> Didn’t ask for this email? Just ignore me.								</p></td>
							</tr>
							</tbody></table>
						</td>
					</tr>
					</tbody></table>
                </div>
			</td>
        	</tr>
          	</tbody></table>
		</td>
 	</tr>
    </tbody></table>
    </body> `;
    sendEmail(email, "confirm email", html);
    await user.save();
    res.status(201).send({ user, successful: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/confirmEmail/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.EMAILTOKEN);
    const user = await User.findOneAndUpdate(
      { email: decoded.email, confirmEmail: false },
      { confirmEmail: true }
    );

    if (!user) {
      return res.status(400).json({ message: "your email is not verified" });
    }
    if (user) {
      return res.status(400).json({ message: "your email is verified" });
    }
  } catch (error) {
    console.error(error);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    if (!user.confirmEmail) {
      return res.status(400).json({ message: "plz confirm your eamil " });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      user.tokens = user.tokens.concat({ token });
      await user.save();
      res.send({ user, token, successful: true });
    } else {
      return res.status(400).send({ error: "Password is wrong!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const me = await User.findOne({ _id: decoded.userId });
    if (!me) {
      return res.status(400).send({ error: "No User!" });
    }
    res.send(me);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/prediction", async (req, res) => {
  try {
    const {
      Age,
      Gender,
      Height,
      Weight,
      HighBP,
      LowBP,
      Cholesterol,
      Glucose,
      Smoking,
      Alcohol,
      Activity,
    } = req.body;

    const BMI = Weight / ((Height / 100) * (Height / 100));

    const BP = LowBP + (1 / 3) * (HighBP - LowBP);

    // console.log(BMI);
    // console.log(BP);

    // const data = [{ BMI, BP, ...req.body }]; // Wrap the request body in a list to match the expected format

    // const data = [req.body]; // Wrap the request body in a list to match the expected format

    const data = {
      Age,
      Gender,
      Height,
      Weight,
      BMI,
      HighBP,
      LowBP,
      BP,
      Cholesterol,
      Glucose,
      Smoking,
      Alcohol,
      Activity,
    };

    // Send a POST request to the Python API
    const response = await axios.post("http://127.0.0.1:5000/predict", [data], {
      headers: { "Content-Type": "application/json" }, // Set the content type to JSON
    });

    // Handle the response from Python
    const predictions = response.data.predictions; // Update to match the response format

    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const MidInf = new MedInf({
      ...data,
      Result: predictions[0],
      user: decoded.userId,
    });

    await MidInf.save();

    // Handle the predictions as needed
    console.log({ predictions });

    // Send the predictions as the response
    res.json({ predictions });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// router.put("/users/update", async (req, res) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById({ _id: decoded.userId });
//     if (!user) {
//       return res.status(404).send("User not found!");
//     }
//     if (!req.body) {
//       return res.status(400).send("Please enter data to update");
//     }
//     if (req.body.name) {
//       user.name = req.body.name;
//     }

//     if (req.body.email) {
//       user.email = req.body.email;
//     }

//     if (req.body.phoneNumber) {
//       user.phoneNumber = req.body.phoneNumber;
//     }

//     if (req.body.gender) {
//       user.gender = req.body.gender;
//     }

//     if (req.body.age) {
//       user.age = req.body.age;
//     }
//     if (req.body.password) {
//       user.password = bcrypt.hashSync(req.body.password, 8);
//     }
//     if (!user.isModified()) {
//       return res.status(400).json({ message: "No information updated." });
//     }

//     await user.save();
//     res.status(200).send({ message: "User information updated:", user });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/users/prediction", async (req, res) => {
//   try {
//     const data = [req.body]; // Wrap the request body in a list to match the expected format

//     // Send a POST request to the Python API
//     const response = await axios.post("http://127.0.0.1:5000/predict", data);

//     // Handle the response from Python
//     const predictions = response.data.prediction;

//     // const MidInf = new MedInf(req.body);
//     // await MidInf.save();

//     console.log(predictions);
//     res.json({ prediction: predictions });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// {
//   "Age(year)": 27,
//   "Gender": 1,
//   "Height(cm)": 150,
//   "Weight(kg)": 57,
//   "BMI(kg/m^2)": 25.33,
//   "Systolic Blood Pressure(mmHg)": 121,
//   "Diastolic Blood Pressure(mmHg)": 80,
//   "BP": 50,
//   "Cholesterol": 7,
//   "Glucose": 0,
//   "smoke": 0,
//   "alco": 0,
//   "active": 1
// }
