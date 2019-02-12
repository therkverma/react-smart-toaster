# react-smart-toaster

[![npm version](https://img.shields.io/npm/v/react-smart-toaster.svg)](https://www.npmjs.com/package/react-smart-toaster)
[![downloads](https://img.shields.io/npm/dt/react-smart-toaster.svg)](https://www.npmjs.com/package/react-smart-toaster)
[![dependencies](https://david-dm.org/therkverma/react-smart-toaster.svg)](https://david-dm.org/therkverma/react-smart-toaster)
[![devDependencies](https://david-dm.org/therkverma/react-smart-toaster/dev-status.svg)](https://david-dm.org/therkverma/react-smart-toaster?type=dev)


Super light-weight React component for flash messages

Checkout Example [Demo](https://github.com/therkverma/react-smart-toaster/) - [Codesandbox Playground](https://codesandbox.io/s/j428ookvnv)

![Preview](https://res.cloudinary.com/therkverma-github-io/image/upload/fl_apng/v1547741460/react-smart-toaster.png)

### Installation

```sh
npm install react-smart-toaster
```

### Overview

Import `SmartToaster` and `toast` in your project file

```javascript
import { SmartToaster, toast } from 'react-smart-toaster';
```
Place `SmartToaster` component in a file that will be render on every page. Like Navbar, Header, Footer or whatever you want to place. Like this:-

```javascript
<SmartToaster 
    store={toast} 
    lightBackground={true} 
    position={"top_left"}
/>
<button onClick={
    () => toast.success("React Smart Toaster - Success")
    }>
    Success
</button>
```

### Properties (For SmartToaster)

##### lightBackground {boolean} default: false (Optional)

`lightBackground` property will be change the background color of toaster slide. If you don't want to change it, then don't set this attribute. The default value is false for lightBackground.


##### position {string} default: top_left (Optional)

The `position` is used for render location of toaster. The default value of toaster position is `top_left`. You can change location to following options:-

- top_left
- top_right
- bottom_left
- bottom_right
- top_center
- bottom_center


##### fadeOutTimer {number} default: 3000 (Optional)

`fadeOutTimer` also an optional attribute of SmartToaster. You can increase or decrease the fade-out time of toaster message. Default value for fadeOutTimer is 3000 ms.



### Properties (For toast)
```javascript
toast.TYPE(MESSAGE, CLASSNAME)
```
##### TYPE {function}

Type parameter defined the function type. Like if you want to flash success toaster.
Enter like this `toast.success(MESSAGE)`. There are four kind of function for diffrent diffrent flash message.
- success
- error
- info
- warning


##### MESSAGE (Required)

Message value can be anything that you want to flash in toaster.


##### CLASSNAME (Optional)

If you want to set custom style for any message, then you can pass second parameter of class name, this class style will be implemented on this toast.


### License

See the [License](LICENSE) file.
