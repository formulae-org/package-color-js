/*
Fōrmulæ color package. Module for expression definition & visualization.
Copyright (C) 2015-2025 Laurence R. Ugalde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

export class Color extends Formulae.Package {}

Color.Color = class extends Expression.NullaryExpression {
	getTag() { return "Color.Color"; }
	getName() { return Color.messages.nameColor; }
	
	set(name, value) {
		switch (name) {
			case "Red"  : this.redValue   = value; return;
			case "Green": this.greenValue = value; return;
			case "Blue" : this.blueValue  = value; return;
			case "Alpha": this.alphaValue = value; return;
		}
		
		super.set(name, value);
	}
	
	get(name) {
		switch (name) {
			case "Red"  : return this.redValue;
			case "Green": return this.greenValue;
			case "Blue" : return this.blueValue;
			case "Alpha": return this.alphaValue;
		}
		
		super.get(name);
	}
	
	getSerializationNames() {
		return [ "Red", "Green", "Blue", "Alpha" ];
	}
	
	async getSerializationStrings() {
		return [ this.redValue.toString(), this.greenValue.toString(), this.blueValue.toString(), this.alphaValue.toString() ];
	}
	
	setSerializationStrings(strings, promises) {
		let f = parseFloat(strings[0]); if (isNaN(f)) throw "Invalid number: " + strings[0];
		this.set("Red", f);
		
		f = parseFloat(strings[1]); if (isNaN(f)) throw "Invalid number: " + strings[1];
		this.set("Green", f);
		
		f = parseFloat(strings[2]); if (isNaN(f)) throw "Invalid number: " + strings[2];
		this.set("Blue", f);
		
		f = parseFloat(strings[3]); if (isNaN(f)) throw "Invalid number: " + strings[3];
		this.set("Alpha", f);
	}
	
	prepareDisplay(context) {
		this.width = this.height = 10;
		this.horzBaseline = this.vertBaseline = 5;
	}
	
	display(context, x, y) {
		let bkpFillStyle = context.fillStyle;
		context.fillStyle = "rgba(" + (this.redValue * 100.0).toString() + "%," + (this.greenValue * 100.0).toString() + "%," + (this.blueValue * 100.0).toString() + "%," + this.alphaValue.toString() + ")";
		
		context.fillRect(x, y, 10, 10);
		
		context.fillStyle = bkpFillStyle;
	}
}

Color.setExpressions = function(module) {
	Formulae.setExpression(module, "Color.Color", Color.Color);
	
	Formulae.setExpression(module, "Color.CreateColor", {
		clazz:        Expression.Function,
		getTag:       () => "Color.CreateColor",
		getMnemonic:  () => Color.messages.mnemonicCreateColor,
		getName:      () => Color.messages.nameCreateColor,
		getChildName: index => Color.messages.childrenCreateColor[index],
		min: 3, max: 4
	});
	
	// 1-parameter functions
	[ "GetComponents", "InvertColor" ].forEach(tag => Formulae.setExpression(module, "Color." + tag, {
		clazz:        Expression.Function,
		getTag:       () => "Color." + tag,
		getMnemonic:  () => Color.messages["mnemonic" + tag],
		getName:      () => Color.messages["name" + tag],
		getChildName: index => Color.messages["child" + tag],
	}));
};
