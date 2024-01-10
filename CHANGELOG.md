# Changelog
All notable changes to this project will be documented in this file.

## 3.1.0
### Added
- Sanitize code blocks federated from other instances (@Pamasich)
### Fixed
- Restore browser default appearance of checkboxes and radio fields
- Label OP: properly show expected opacity (75%) of final label due to inherited opacity of parent element
- Alpha sort subs: properly align name/link when sorting usernames on followers list
- Reduce verbosity of log messages in some mods
### Changed
- Open links from KES window in new tab

## 3.0.0
### Added
- Softblock magazines (shazbot)
- Import/export global KES settings via backup menu
- Search by feature name: search for a mod (feature) by name and click to jump to its page
- API: new method of generating KES from atomic manifest objects
### Fixed
- Kbin Federation Awareness: make feature toggle dynamically without requiring refresh
- Label OP: make feature toggle dynamically without requiring refresh
- User instance names: drop unnecessary creation of observers on mutation events
- Magazine instance names: drop unnecessary creation of observers on mutation events
## 2.2.4
### Fixed
- Adjust appearance of ON/OFF toggles due to new kbin styling
## 2.2.3
### Fixed
- Undeclared variable in omnibar
- Restore federation awareness functionality per latest kbin update
## 2.2.2
### Fixed
- Hide posts: expanded images not being hidden along with post
## 2.2.1
### Fixed
- Navigation resetting on omnibar
## 2.2.0
### Added
- Subs omnibar (shazbot)
- NSFW blur disabler (shazbot)
- Customize colors (minnieo)
- Hover mod (minnieo)
- Checkmark next to subbed mags (shazbot)
- API: getHex()
- API: manifest generator
### Fixed
- Alpha sort list: also apply to followers page
- Display custom colors correctly in KES menus when user updates colors
- Notifications panel: fit into viewport on narrow mobile devices
- Hide thumbnails: restore default CSS when disabled on mobile
## 2.1.4
### Fixed
- Dropdown subscriptions: target hostnames other than kbin.social
- Notifications panel: target hostnames other than kbin.social
## 2.1.3
### Fixed
- Make notipanel button more clickable
- Merge unread message/thread notification counters into one count
- Cleanly restore message badges when notipanel is toggled off
## 2.1.2
### Fixed
- Initial support for FireMonkey extension
- Ensure hamburger menu opens correctly
- Make KES icon comply with hamburger menu styling
### Added
- API: support inheriting kbin theme vars when setting color input fields
## 2.1.1
### Fixed
- Notifications panel going missing due to change in upstream kbin CSS
### Added
- Support for incremental values in range sliders
## 2.1.0
### Added
- Resize fonts globally (minnieo)
- Hide threads permanently (shazbot)
- Mobile cleanup (Twelph)
- Move/hide federation warning (PrinzKasper)
- Always expand post bodies (shazbot)
- Clarify recipient on compose (shazbot)
- Rearrange thread element order (shazbot)
- Alpha sort subs list (shazbot)
- Add accessibility category
### Fixed
- Hamburger menu disappears when using toggle logo mod on mobile
- Alignment of wrench icon in hamburger menu
- Collapsible comments: several fixes for nested replies, reply threads 10+ comments deep, infinite scrolling
### Changed
- Notifications panel: smoother load and pagination
- Hide sidebar: show/hide specific elements of the sidebar, such as random posts/threads
- Hide thumbnails: granular toggles for thread index/inline thumbnails
- Notifier and settings icons: better visibility across all themes
### API
- Pass mutation events through to mods for parsing
## 2.0.7
### Fixed
- Settings icon on mobile view not visible on light themes
## 2.0.6
### Fixed
- Insert settings icon into proper part of hamburger menu on mobile
## 2.0.5
### Fixed
- Settings icon not visible on narrow mobile device screens
## 2.0.4
### Fixed:
- Navbar-icons-as-text: use kbin fallback font settings
## 2.0.3
### Fixed
- Add OP label: OP label appears on other usernames when OP replies in thread
- Navbar-icons-as-text: text does not respect browser defaults
### Added
- Navbar-icons-as-text: custom slider for font weight
- Added kbin.cafe to includes
## 2.0.2
### Fixed
- Restore dropped URL used when fetching updates
## 2.0.1
### Fixed
- KES not auto-updating in ViolentMonkey
## 2.0.0
### Added
- Transparent Mode: click the icon to see behind the KES menu and check changes on the page; click again to return
- Notifier on wrench icon if updates to KES are available
- Reset button: clear all saved KES settings and reset
- Clipboard button: copy system information to clipboard (for bug reports)
- Notifications Panel (blobcat): adds a navbar bell icon that opens notifications in an iframe
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
