/*
Fōrmulæ color package. Module for reduction.
Copyright (C) 2015-2023 Laurence R. Ugalde

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

Color.createColor = async (createColor, session) => {
	let r, g, b, a = 1;
	
	// red
	try {
		r = createColor.children[0].evaluate();
	}
	catch (error) {
		if (error instanceof EvaluationError) {
			console.log(error);
			ReductionManager.setInError(createColor.children[0], "Argument is not numeric");
			throw new ReductionError();
		}
	}

	// green
	try {
		g = createColor.children[1].evaluate();
	}
	catch (error) {
		if (error instanceof EvaluationError) {
			ReductionManager.setInError(createColor.children[1], "Argument is not numeric");
			throw new ReductionError();
		}
	}

	// blue
	try {
		b = createColor.children[2].evaluate();
	}
	catch (error) {
		if (error instanceof EvaluationError) {
			ReductionManager.setInError(createColor.children[2], "Argument is not numeric");
			throw new ReductionError();
		}
	}

	// alpha	
	if (createColor.children.length >= 4) {
		try {
			a = createColor.children[3].evaluate();
		}
		catch (error) {
			if (error instanceof EvaluationError) {
				ReductionManager.setInError(createColor.children[3], "Argument is not numeric");
				throw new ReductionError();
			}
		}
	}
		
	//////////////////////////
	
	let color = Formulae.createExpression("Color.Color");
	color.set("Red",   r);
	color.set("Green", g);
	color.set("Blue",  b);
	color.set("Alpha", a);
	
	createColor.replaceBy(color);
	return true;
};

Color.getComponents = async (getComponents, session) => {
	let colorExpression = getComponents.children[0];
	if (colorExpression.getTag() !== "Color.Color") {
		ReductionManager.setInError(colorExpression, "It must be a color expression");
		throw new ReductionError();
	}
	
	let r = colorExpression.get("Red");
	let g = colorExpression.get("Green");
	let b = colorExpression.get("Blue");
	let a = colorExpression.get("Alpha");
	
	let result = Formulae.createExpression("List.List");
	result.addChild(CanonicalArithmetic.number2Expr(r, true));
	result.addChild(CanonicalArithmetic.number2Expr(g, true));
	result.addChild(CanonicalArithmetic.number2Expr(b, true));
	result.addChild(CanonicalArithmetic.number2Expr(a, true));
	
	getComponents.replaceBy(result);
	return true;
};

Color.colorExpression = async (colorExpression, session) => {
	let color = colorExpression.children[1];
	if (color.getTag() !== "Color.Color") {
		ReductionManager.setInError(colorExpression, "It must be a color expression");
		throw new ReductionError();
	}
	
	let result = Formulae.createExpression("Color.ColoredExpression");
	result.set("Red",   color.get("Red"));
	result.set("Green", color.get("Green"));
	result.set("Blue",  color.get("Blue"));
	result.set("Alpha", color.get("Alpha"));
	result.addChild(colorExpression.children[0]);
	
	colorExpression.replaceBy(result);
	return true;
};

Color.invertColor = async (invertColor, session) => {
	let colorExpression = invertColor.children[0];
	if (colorExpression.getTag() !== "Color.Color") {
		ReductionManager.setInError(colorExpression, "It must be a color expression");
		throw new ReductionError();
	}
	
	let result = Formulae.createExpression("Color.Color");
	result.set("Red",   1 - colorExpression.get("Red"));
	result.set("Green", 1 - colorExpression.get("Green"));
	result.set("Blue",  1 - colorExpression.get("Blue"));
	result.set("Alpha", colorExpression.get("Alpha"));
	
	invertColor.replaceBy(result);
	return true;
};

Color.compare = async (compare, session) => {
	let left = compare.children[0], right = compare.children[1];
	
	if (left.getTag() === "Color.Color" && right.getTag() === "Color.Color") {
		compare.replaceBy(Formulae.createExpression(
			left.get("Red"  ) === right.get("Red"  ) &&
			left.get("Green") === right.get("Green") &&
			left.get("Blue" ) === right.get("Blue" ) &&
			left.get("Alpha") === right.get("Alpha") ?
			"Relation.Comparison.Equals" :
			"Relation.Comparison.Different"
		));
		
		return true;
	}
	
	return false; // Ok, to forward to other forms of Compare
};

Color.setReducers = () => {
	ReductionManager.addReducer("Color.CreateColor",     Color.createColor,     "Color.createColor");
	ReductionManager.addReducer("Color.GetComponents",   Color.getComponents,   "Color.getComponents");
	ReductionManager.addReducer("Color.InvertColor",     Color.invertColor,     "Color.invertColor");
	ReductionManager.addReducer("Color.ColorExpression", Color.colorExpression, "Color.colorExpression");
	ReductionManager.addReducer("Relation.Compare",      Color.compare,         "Color.compare");
}
