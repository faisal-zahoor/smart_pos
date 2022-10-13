# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import get_url
from six.moves.urllib.parse import urlparse, urlencode

class SmartPOS(Document):
	pass

@frappe.whitelist()
def make_invoice(doctype,name):
		self = frappe.get_doc(doctype,name)
		items = []
		payments = []
		for d in self.pos_item_table:
				items.append({"item_code": d.item,"qty": d.qty,"discount_percentage": d.discount,"rate": d.rate,"amount": d.amount,"stock_uom": d.stock_uom,"warehouse":self.warehouse})
		payments.append({"default": 1,"mode_of_payment": "POS CASH","account": "CASH ISP - POS - SB","amount": self.grand_total})
		sales_invoice= frappe.get_doc({
		"doctype": "Sales Invoice",
		"customer": self.customer,
		"is_pos": self.is_paid,
		"update_stock": self.update_stock,
		"set_warehouse": self.warehouse,
		"posting_date": self.posting_date,
		"posting_time": self.time,
		"apply_discount_on": "Net Total",
		"additional_discount_percentage" : self.discount,
		"items": items,
		"payments": payments
		}).insert()
		#sinv_doc = sales_invoice.save()
		sales_invoice.submit()
		print_url = get_url("/printview?doctype=Sales%20Invoice&name="+str(sales_invoice.name)+"&trigger_print=1&format="+str(get_print_format()))
		return print_url

@frappe.whitelist(allow_guest=True)
def getSettings(user):
	item_data = frappe.db.sql("""select customer,warehouse,cost_center,is_paid,update_stock
from `tabSmart POS Settings` where  user_id =  '{0}'; """.format(user), as_list=1)
	return item_data

@frappe.whitelist(allow_guest=True)
def getVAL_Rate(item):
	item_data = frappe.db.sql("""select sum(stock_value)/sum(qty_after_transaction) from `tabStock Ledger Entry` where item_code = '{0}'
				and (warehouse = 'Store - Shuwaikh - SB' or warehouse = 'Ahmadi S/R - SB'
				or warehouse = 'Decor - Shuwaikh - SB' or warehouse = 'Main SB - SB' or warehouse = 'Shuwaikh S/R - SB')
				and is_cancelled='No'
				order by posting_date desc, posting_time desc, name desc;""".format(item), as_list=1)
	return item_data[0][0] if item_data else 0.0

def get_print_format():
	return frappe.db.get_value("Smart POS Settings",frappe.session.user,"print_format") or "POS%202"


