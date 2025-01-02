/*
Fōrmulæ color package. Module for edition.
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

Color.editionColor = function() {
	Formulae.Forms.colorSelection(0.0, 0.0, 0.0, 1.0, (red, green, blue, opacity) => {
		let newExpression = Formulae.createExpression("Color.Color");
		
		newExpression.set("Red",   red);
		newExpression.set("Green", green);
		newExpression.set("Blue",  blue);
		newExpression.set("Alpha", opacity);
		
		Formulae.sExpression.replaceBy(newExpression);
		Formulae.sHandler.prepareDisplay();
		Formulae.sHandler.display();
		Formulae.setSelected(Formulae.sHandler, newExpression, false);
	});
}

Color.actionColor = {
	isAvailableNow: () => Formulae.sHandler.type != Formulae.ROW_OUTPUT,
	getDescription: () => "Edit color...",
	doAction: () => {
		Formulae.Forms.colorSelection(
			Formulae.sExpression.get("Red"),
			Formulae.sExpression.get("Green"),
			Formulae.sExpression.get("Blue"),
			Formulae.sExpression.get("Alpha"),
			(red, green, blue, opacity) => {
				Formulae.sExpression.set("Red",   red);
				Formulae.sExpression.set("Green", green);
				Formulae.sExpression.set("Blue",  blue);
				Formulae.sExpression.set("Alpha", opacity);
				
				Formulae.sHandler.prepareDisplay();
				Formulae.sHandler.display();
				Formulae.setSelected(Formulae.sHandler, Formulae.sExpression, false);
			}
		);
	}
};

Color.setEditions = function() {
	Formulae.addEdition(this.messages.pathColor, null, this.messages.leafColor, Color.editionColor);
	Formulae.addEdition(this.messages.pathColor, null, this.messages.leafCreateColor, () => Expression.multipleEdition("Color.CreateColor", 3, 0));
	Formulae.addEdition(this.messages.pathColor, null, this.messages.leafGetComponents, () => Expression.wrapperEdition("Color.GetComponents"));
	Formulae.addEdition(this.messages.pathColor, null, this.messages.leafInvertColor, () => Expression.wrapperEdition("Color.InvertColor"));
};

Color.setActions = function() {
	Formulae.addAction("Color.Color", Color.actionColor);
};
