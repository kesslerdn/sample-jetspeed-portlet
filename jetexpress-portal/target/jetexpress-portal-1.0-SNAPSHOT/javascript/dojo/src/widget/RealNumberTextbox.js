
dojo.provide("dojo.widget.RealNumberTextbox");
dojo.require("dojo.widget.IntegerTextbox");
dojo.require("dojo.validate.common");
dojo.widget.defineWidget(
"dojo.widget.RealNumberTextbox",
dojo.widget.IntegerTextbox,
{mixInProperties: function(localProperties, frag){dojo.widget.RealNumberTextbox.superclass.mixInProperties.apply(this, arguments);
if (localProperties.places){this.flags.places = Number(localProperties.places);
if((localProperties.exponent == "true")||
(localProperties.exponent == "always")){this.flags.exponent = true;
if((localProperties.esigned == "true")||(localProperties.esigned == "always")){this.flags.eSigned = true;
if(localProperties.min){this.flags.min = parseFloat(localProperties.min);
if(localProperties.max){this.flags.max = parseFloat(localProperties.max);
isValid: function(){return dojo.validate.isRealNumber(this.textbox.value, this.flags);
isInRange: function(){return dojo.validate.isInRange(this.textbox.value, this.flags);
);