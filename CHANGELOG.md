# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v0.4.0] - 2018-04-08
### Added
- Added function, `filterEntries()` to automatically filter entries and markers based on `filterText` in `app.js`.
- Added variable `globalAccess` to point to the ViewModel and allow outside access to functions in the ViewModel.

### Changed
- Placed accordian cards in a new `<div>` called entries to allow easier filtering in `index.html`.
- Changed `Knockout.Js` script source from 3.2 to the latest version.

### Fixed
- Fixed issue with InfoWindows not being able to retrieve data from `locationList()` observable array.

### Removed
- Removed any unnecessary or redundant code in `app.js`.
- Removed debugging scripts,  `console.log()`.

## [v0.3.1] - 2018-04-05
### Added
- Added function to animate accordian display on mobile version when pressed.

### Changed
- Changed array of locations that are to be displayed on Google Maps in `app.js`.
- Changed filter button location for mobile and web version in `index.html`.
- Changed accordian style and display for mobile and web version in `index.html`.

### Fixed
- Fixed accidental revert of `v0.3.0`.
- Fixed minor naming convention of version semantics from `[0.3.0]` to `v0.3.0`.

## [v0.3.0] - 2018-03-18
### Added
- Added bootstrap elements to `index.html`.
- Added menu button to `index.html`.
- Added a style change to Google Maps based on night-time or day-time for the local user.
- Added bounds to Google Maps to initially render a viewport displaying all the markers.
- Added an array to hold the new markers created.
- Added FourSquare API to the ViewModel.

### Changed
- Changed the Menu Pane to an accordian style collapse.
- Changed the `.css` stylesheet rendered based on the type of device you are viewing the website on.

### Removed
- Removed any unnecessary or redundant code in `app.js`.

## [v0.2.0] - 2018-03-06
### Added
- Added Google Maps display in `index.html` view.
- Added Menu Pane to `index.html` view.
- Added Footer Pane to `index.html` view.
- Added `style.css` with preliminary styles for UI inside the view.
- Added `README.md` to describe to the enduser details about this project.
- Added `CHANGELOG.md` to document changes to the project.
- Added `TODO.md` to `.gitignore`.
- Added markers and infowindows to `app.js`.

## [v0.1.0] - 2018-03-05
### Added
- Added preliminary files `index.html` and `app.js`.
- Added `.gitignore` to prevent `.DS_Store` from being pushed to GitHub.

[Unreleased]: https://github.com/jye0325/Neighborhood-Map/compare/v0.3.1...HEAD
[v0.3.1]: https://github.com/jye0325/Neighborhood-Map/compare/v0.3.0...v0.3.1
[v0.3.0]: https://github.com/jye0325/Neighborhood-Map/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/jye0325/Neighborhood-Map/compare/v0.1.0...v0.2.0
