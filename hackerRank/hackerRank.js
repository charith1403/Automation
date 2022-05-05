const puppeteer = require("puppeteer");
const mailId = "xilono7229@idurse.com";
const password = "qwerasdfvbnm";
const code = require("./code");


let browserPromise = puppeteer.launch({headless: false, defaultViewport: null});
//args: ['--start-fullscreen']   -- to make it fullscreen
let page;
//opens browser
browserPromise.then(function(browserPromise){
    console.log("browser is opened");
    pagePromise = browserPromise.newPage();
    return pagePromise;
}).then(function(pagePromise){
    // opens new tab
    console.log("New page is opened");
    page = pagePromise;
    let urlPromise = page.goto("https://www.hackerrank.com");
    return urlPromise;
}).then(function(){
    // opens hackerrank website
    console.log("url is opened");
    // waits till the page is loaded so that the below class is accessible
    // clicks on login page in hackerrank website
    return waitAndClick("#menu-item-2887 a");
}).then(function(){
    //opens login page for hacker rank
    // waits till the page is loaded so that the below class is accessible
    let waitPromise = page.waitForSelector(".fl-col-content.fl-node-content .fl-button");
    return waitPromise;
}).then(function(){
        // click on login for option in hackerrank login page
    let clickPromise = page.evaluate(function(){
        let login = document.querySelectorAll(".fl-col-content.fl-node-content .fl-button");
        // click on the login for developers option in hackerrank login page
        login[1].click();
        return;
    })
    return clickPromise;
    // opens login for developers page in hackerrank
}).then(function(){
    // waits for the page to load to access below input fields for email and password
    let waitMailId = page.waitForSelector("#input-1");
    return waitMailId;
    // return waitAndClick("#input-1");
}).then(function(){
    // fills email field
    let fillMailId = page.type("#input-1",mailId,{delay :100 });
    return fillMailId;
}).then(function(){
    //fills password field
    let fillPassword = page.type("#input-2",password,{delay: 100});
    return fillPassword;
}).then(function(){
    // click on the login button
    let loginclick = page.click("button[data-analytics=\"LoginPassword\"]")
    return loginclick;
}).then(function(){
    // waits and click on algorithm option
    return waitAndClick("a[data-attr1=\"algorithms\"]")
}).then(function(){
    // return page.waitForSelector("input[value=\"warmup\"]");
    return page.waitForSelector(".filter-group");
}).then(function(){
    // check warmup field (** but for some reason its not selecting completely)
    return page.click('input[value="warmup"]');
    // let domSelectPromise = page.evaluate(function(){
    //     let clickSelector = document.querySelector('input[value="warmup"]');
    //     clickSelector.click();
    //     let allDivs = document.querySelectorAll(".filter-group");
    //     let div = allDivs[3];
    //     let clickSelector = div.querySelector(".ui-checklist-list-item input");
    //     clickSelector.click();
    //     return;
    // })
    // return domSelectPromise;
}).then(function(){
    console.log("warmup selected");
    return page.waitForSelector('.challenges-list .js-track-click.challenge-list-item');
}).then(function(){
    let qLink = page.evaluate(function(){
        let arr = [];
        let aTags = document.querySelectorAll('.challenges-list .js-track-click.challenge-list-item');
        for(let i=0;i<9;i++)
        {
            arr.push(aTags[i].href);
        }
        return arr;
    })
    return qLink;
}).then(function(qlink){
    // console.log(qlink);
    let qsolve = questionSolver(qlink[0],code.answers[0]);
    return qsolve;
})



function waitAndClick(selector)
{
    return new Promise(function(resolve,reject){
        let waitPromise = page.waitForSelector(selector);
        waitPromise.then(function(){
            return page.click(selector);
        }).then(function(){
            resolve();
        });
    })
}

function questionSolver(link,answer)
{
    return new Promise(function(resolve,reject){
        let problem=page.goto(link);
        problem.then(function(){
        console.log("started solving the question");
        return waitAndClick(".checkbox-wrap input");
        }).then(function(){
            console.log("Input is typed");
            return waitAndClick("#input-1")
        }).then(function(){
            console.log("Typing on the texarea");
            let typePromise = page.type("#input-1",answer);
            return typePromise;
        }).then(function(){
            console.log("code typed");
            return page.keyboard.down("Control");
        }).then(function(){
            return page.keyboard.press("A");
        }).then(function(){
            return page.keyboard.press("X");
        }).then(function(){
            return page.keyboard.up("Control");
        }).then(function(){
            console.log("cut completed");
            return page.click(".view-lines");
        }).then(function(){
            return page.keyboard.down("Control");
        }).then(function(){
            return page.keyboard.press("A");
        }).then(function(){
            return page.keyboard.press("V");
        }).then(function(){
            console.log("paste completed");
            let submit = page.evaluate(function(){
                let buttons = document.querySelectorAll(".hr-monaco-editor-wrapper button");
                buttons[3].click();
                return;
            })
            return submit;
        }).then(function(){
            console.log("code submited");
        })

    });
}