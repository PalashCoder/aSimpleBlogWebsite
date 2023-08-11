import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import https from "https";
import _ from "lodash";

const app = express();
const port = 3000;
let array = [];

const post1 = "A blog is a website or page that is a part of a larger website. Typically, it features articles written in a conversational style with accompanying pictures or videos. Blogging has gained immense popularity due to its enjoyable and adaptable nature, allowing for self - expression and social connections.In addition, it serves as a platform for enhancing writing skills and promoting businesses. Furthermore, a professional blogger can even make money from blogging in various ways, such as Google ads and Amazon affiliate links.Successful blogs can cover any topic.No matter what subject you can think of, there’s likely already a profitable blog dedicated to it. If there is none, this is where you come in.New bloggers who can find a unique niche to create content about have a higher chance of surviving in the competitive blogging world.Preferably, you should be passionate about or an expert in your blog niche.However, don’t worry if you are having a difficult time pinning down a topic – this article will help you. In this article, we will explore 11 types of blogs in different niche industries, including tech, lifestyle, beauty and fashion, health and fitness, education, business and marketing, finance and investment, food, travel, photography, and art and design. We will include five of the best blog examples for each type, discuss each blog example briefly, and highlight what we can learn from the blog.We will also include the info on how it is build, for example, whether a CMS like WordPress was used or a blogging platform."
const post2 = "Blogs have been around since the earliest days of the internet, so most people have a pretty solid idea of what one is—even if they've never really thought to spell it out. To us, a blog is a website, maybe with a few other pages, but the most important part is the feed of blog posts in reverse chronological order. There's a thin line between the software you need to create a blog and the kind of content management systems (CMS) used by large companies to power their websites. Many tools like WordPress and Drupal can be used to both build a blog or power a regular website. When we were putting together this list, we used two criteria to decide on the essential blog - iness of the tools we were testing.They had to make it quick and easy to set up a real blog, and the backend where you write blog posts had to be nice to use and fully - featured.Squarespace, for example, makes it possible to build a blog, but it's not particularly intuitive to set up and the backend is awful to use. Drupal is an incredible CMS, but it's just too hard for non - developers to get started with to really be considered a universal blogging platform.WordPress, on the other hand, is both quick and easy for a regular human to get started with—and the backend is intuitive and great to use. So, on this list, you'll only find tools that pass the essential blog-iness test. But that wasn't enough.We also required all the blogging tools to be: Customizable.A big part of blogging is having a customized site, rather than just another generic Twitter account.We wanted tools that would allow you to choose your own theme and create your own branded blog.The easier it was to do, the better. Well supported.While we wanted the tools on this list to be as easy to use as possible, when you're setting up a website, you'll almost always encounter some weird technical stuff.We required these tools to have either a community of users writing tutorials and helping people solve problems or a dedicated customer care team. (Which support option you have to rely on generally comes down to how much you're prepared to pay per month.) Affordable.This isn't a list of the cheapest blogging platforms, but affordability and value for money were still key criteria. There are free blogging platforms that you can use to start a blog, but if you expect a large amount of traffic or want premium levels of support, you will have to pay something. I've been a tech writer for almost a decade—which is to say, I've been a blogger.I started with a list of around 25 potential blogging platforms, the vast majority of which I'd already tried out, reviewed, or used over the course of my career. A few good CMS and website builder options were quickly cut for being too hard to set up or not having enough focus on blogging, and a few other services were too small to readily recommend or seemed to be discontinued. That left me with around 10 options to test in full—and these are the five best."

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs", { post1: post1, post2: post2, array: array });
});
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});
app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});
app.get("/success", (req, res) => {
    res.render("success.ejs");
});
app.get("/failure", (req, res) => {
    res.render("failure.ejs");
});


app.post("/contact", (req, res) => {
    var name = req.body.text;
    var mail = req.body.email;
    var checkedBody;

    if (req.body.tickk === 'on') {
        checkedBody = "subscribed";
    }
    else {
        checkedBody = "pending";
    }

    var data = {
        members: [
            {
                email_address: mail,
                status: checkedBody,
                merge_fields: {
                    FNAME: name,
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "mailchimp url with server and public id";
    const option = {
        method: "POST",
        auth: "blog:mailchimp key",
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            if (response.statusCode === 200) {
                res.redirect("/success");
            }
            else
                res.redirect("/failure");
        });
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure", (req, res) => {
    res.redirect("/contact");
});
app.post("/compose", (req, res) => {
    var dataobj = {
        title: req.body.title,
        content: req.body.w3review,
    }
    array.push(dataobj);
    res.redirect("/");
});
app.get("/post/:topic", (req, res) => {
    let condi = _.lowerCase(req.params.topic);
    array.forEach(element => {
        if (condi === _.lowerCase(element.title)) {
            res.render("post.ejs", { title: element.title, content: element.content });
        }
    });
});
app.listen(port, () => {
    console.log(`Server Online on port ${port}.`);
});