# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "smart_pos"
app_title = "Smart POS"
app_publisher = "Hardik Gadesha"
app_description = "App for Smart POS"
app_icon = "octicon octicon-file-directory"
app_color = "cyan"
app_email = "hardikgadesha@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/smart_pos/css/smart_pos.css"
# app_include_js = "/assets/smart_pos/js/smart_pos.js"

# include js, css files in header of web template
# web_include_css = "/assets/smart_pos/css/smart_pos.css"
# web_include_js = "/assets/smart_pos/js/smart_pos.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "smart_pos.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "smart_pos.install.before_install"
# after_install = "smart_pos.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "smart_pos.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"smart_pos.tasks.all"
# 	],
# 	"daily": [
# 		"smart_pos.tasks.daily"
# 	],
# 	"hourly": [
# 		"smart_pos.tasks.hourly"
# 	],
# 	"weekly": [
# 		"smart_pos.tasks.weekly"
# 	]
# 	"monthly": [
# 		"smart_pos.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "smart_pos.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "smart_pos.event.get_events"
# }

