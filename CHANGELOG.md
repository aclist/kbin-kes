# Changelog
All notable changes to this project will be documented in this file.
## 2.0.0
### Added
- Transparent Mode: click the icon to see behind the KES menu and check changes on the page; click again to return
- Notifier on wrench icon if updates to KES are available
- Reset button: clear all saved KES settings and reset
- Clipboard button: copy system information to clipboard (for bug reports)
- Notifications Panel (@blobcat): adds a navbar bell icon that opens notifications in an iframe
- Bug-report-from-post: post contents of a message directly to the KES bug tracker
- Support for multiple authors in attribution field
- Support for number field minimum, maximum, and step increments
- Debug page on sidebar
### Fixed
- Support across -monkey extensions (GM, TM, VM)
- Proper link format for authors on other instances
- Fix collision between kbin-federation-awareness and Improved Collapsible Comments when bubbles were enabled
- Show 'My Mags' link when using mobile view
- Make wrench icon easier to click on
### Security
- Parametric generation of script masthead
- Fix for KES menu contents missing on first-time boot
- Display fallback warning header if remote contents could not be fetched
- API: safeGM shim for inter-version compatibility
## 1.3.0
### Added
- kbin-federation-awareness mod
- Support ranges in input fields
## 1.2.2
### Fixed
- Highlight correct active navbar entry when using My Mags
## 1.2.1
### Fixed
- Wrench icon occludes navbar elements when magazine title is long
- Search icon goes missing when used in conjunction with KSP
## 1.2.0
### Added
- Changelog link in KES header (flask icon)
## 1.1.6
### Fixed
- User reputation not being hidden on user popover cards
## 1.1.5
### Fixed
- Navbar icons colliding with Kbin Subscriptions Panel icons on mobile
## 1.1.4
### Fixed
- Apply message links to other instances
- API: make getModSettings() accessible to calling scripts
## 1.1.2
### Fixed
- Support ViolentMonkey with GM_ prefix
## 1.1.1
### Fixed
- Change scope of variables
## 1.1.0
### Added
- Hide thumbnails mod
- Hide sidebar mod
- Custom navbar icons mod
## 1.0.0
Initial stable release
