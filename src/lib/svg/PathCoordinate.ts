
export interface PathCoordinate {
    x: number,
    y: number,
    location: CoordinateLocation
}


export enum CoordinateSystem {
    Cartesian,
    Polar
}

export enum CoordinateLocation {
    /**
     * absolute position
     */
    Absolute,
    /**
     * relative to previous position
     */
    Relative
}

export enum Angle {
    Radians,
    Degrees
}

export interface Coordinate {
    system: CoordinateSystem;
}

export interface CoordinatePolar extends Coordinate {
    radius: number;
    angle: Angle;
    system: CoordinateSystem.Polar;
}

export interface CoordinatePolarRadians extends CoordinatePolar {
    angle: Angle.Radians;
    radians: number;
}

export interface CoordinatePolarDegrees extends CoordinatePolar {
    angle: Angle.Degrees;
    degrees: number;
}

export interface CoordinateCartesian extends Coordinate {
    x: number;
    y: number;
    location: CoordinateLocation;
    system: CoordinateSystem.Cartesian;
}

export interface CoordinateCartesianRelative extends CoordinateCartesian {
    location: CoordinateLocation.Relative;
}

export interface CoordinateCartesianAbsolute extends CoordinateCartesian {
    location: CoordinateLocation.Absolute;
}

export function polarToRelativeCartesian(coordinate: CoordinatePolar): CoordinateCartesianRelative {
    let radians = 0;

    if (coordinate.angle === Angle.Degrees) {
        radians = Math.PI * 2 * ((coordinate as CoordinatePolarDegrees).degrees % 360) / 360;
    }
    else if (coordinate.angle === Angle.Radians) {
        radians = (coordinate as CoordinatePolarRadians).radians;
    }

    const radius = coordinate.radius;
    const x = radius * Math.sin(radians);
    const y = radius * Math.sin(radians);

    const cartesian: CoordinateCartesianRelative = {
        x,
        y,
        location: CoordinateLocation.Relative,
        system: CoordinateSystem.Cartesian
    };

    return cartesian;
}