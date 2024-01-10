# package-color-js

Color package for the [Fōrmulæ](https://formulae.org) programming language.

Fōrmulæ is also a software framework for visualization, edition and manipulation of complex expressions, from many fields. The code for an specific field —i.e. arithmetics— is encapsulated in a single unit called a Fōrmulæ **package**.

This repository contains the source code for the **color package**. It contains functionallity to visualize and edit color expressions, and performs operations with colors.

The GitHub organization [formulae-org](https://github.com/formulae-org) encompasses the source code for the rest of packages, as well as the [web application](https://github.com/formulae-org/formulae-js).

<!--
Take a look at this [tutorial](https://formulae.org/?script=tutorials/Complex) to know the capabilities of the Fōrmulæ arithmetic package.
-->

### Capabilities ###

* Visualization
    * Colors, as a small rectangle painted with the specified color. Color supports transparency.

* Edition
   * Selection of a color interactively

* Operations with colors
    * Creation of a color given its component of reg, green, blue and opacity
    * Retrieving the components (red, green, blue, opacity) of a given color expression
    * Retrieving the inverse of a given color expression
