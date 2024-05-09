const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded( { extended: false } ));
router.use(express.json());

function containsXSS(text) {
    return text.match(/(<[^>]*>)(.*?)([^>]*>)/);
}

function replaceXSS(text) {
    return text.replace(/(<[^>]*>)(.*?)([^>]*>)/, "");
}

router.get('/', (req, res) => {
    var username = req.query.username;
    res.render("create_post", { error_message: "none", username });
});

router.post("/", async (req, res) => {
    var { title, text_body } = await req.body;
    
    console.log(`Title: ${title}\nContent: ${text_body}`);

    if (containsXSS(title) || containsXSS(text_body )){
        title = replaceXSS(title);
        console.log(`Sanitised title: ${title}`);
        text_body = replaceXSS(text_body);
        console.log(`Sanitised content: ${text_body}`);
    }

    if (title.length < 1) {
        return res.render("create_post", { error_message: "Error creating post. Please try again.", username: "test69" })
    }

    res.redirect(`/authed?username=test69`);
});

module.exports = router;