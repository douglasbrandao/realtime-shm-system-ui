# Realtime structural health monitoring system

It is an interface built to monitor sensors from an acquisition system attached to a Raspberry Pi (The embedded code on RP will not be shared on my Github for now).

## How it works

- User can sign in and sign up (It is not required to validate email)
- User can add new modules (RP are considered modules, an user can add multiple of them), structures configuration and specify which pins on Raspberry will have sensors to read and which one you will add as a calibration pin.
- User can add a new analysis selecting which module and structure configuration you want to use
- User can start a new analysis and see the graphs in realtime
- User can see the damage metrics simultaneously and move the bar up and down to select the threshold to that damage.

## Author

Douglas Frota Brandão - [douglasbrandao](https://github.com/douglasbrandao "Douglas Brandão")