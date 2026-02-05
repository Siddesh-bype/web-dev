import React from "react";
import{createRoot} from "react-dom/client";
const customStyle={
    color :"black"
};
const time =new Date().getHours();
let mess;
if(time<12){
    mess ="Good Morning";
    customStyle.color="red";
}else if(time<18){
    mess="Good Afternoon";
    customStyle.color="green";
}else if(time<22){
    mess="Good Afternoon";
    customStyle.color="blue";
}else{
    mess="Good Night";
}

const root = createRoot(document.getElementById("root"));
root.render(
    <div>
        <h1 className="heading" style={customStyle}>
            {mess}
        </h1>
    </div>
);
//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
