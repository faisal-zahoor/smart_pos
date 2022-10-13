// Copyright (c) 2019, Hardik Gadesha and contributors
// For license information, please see license.txt


frappe.ui.form.on("Smart POS", {
onload: function(me) {
    		me.page.sidebar.remove();
    		me.page.wrapper.find(".layout-main-section-wrapper").removeClass("col-md-10");
    		cur_frm.clear_table("pos_item_table");
                cur_frm.set_value("net_total","");
	        cur_frm.set_value("grand_total","");
		cur_frm.set_value("discount","");
}

});

frappe.ui.form.on("Smart POS", {
validate: function(frm,cdt,cdn) {
    frappe.confirm(
    'Are you sure to submit?',
    function(){
        frappe.call({
            method:"smart_pos.smart_pos.doctype.smart_pos.smart_pos.make_invoice",
            args:{'doctype':frm.doc.doctype,'name':frm.doc.name},
            callback:function(r){
                console.log(r.message);
                if(r.message){
				frm.clear_table("pos_item_table");
				frm.clear_table("smart_pos_payment_mode");
                frm.set_value("net_total",0.0);
                frm.set_value("grand_total",0.0);
		frm.set_value("discount",0.0);
				frm.refresh_field("pos_item_table");
				frm.refresh_field("smart_pos_payment_mode");
				var url = encodeURI(r.message)
                var msgbox = frappe.msgprint(`<a class="btn btn-primary print-btn" href=`+r.message+` target="_blank" style="margin-right: 5px;">
					${__('Print')}</a>`);
					console.log(msgbox)
					$(msgbox.body).find('.print-btn').on('click', () => {
						msgbox.hide();					})
            }
            }
        });
    },
    function(){
    });
}
});

cur_frm.add_fetch('item', 'standard_rate', 'standard_rate');
cur_frm.add_fetch('item', 'standard_rate', 'rate');
cur_frm.add_fetch('item', 'stock_uom', 'stock_uom');

frappe.ui.form.on("POS Item Table", "qty", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, "amount", (d.qty * d.rate));
		var pos_item_table = frm.doc.pos_item_table;
	  	var net_total = 0;
			for (var i in pos_item_table){
				net_total = net_total + pos_item_table[i].amount;
				cur_frm.set_value("net_total",net_total);
				cur_frm.set_value("grand_total",net_total);
			}
});

frappe.ui.form.on("POS Item Table", "discount", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, "rate", (d.standard_rate -(d.discount / 100) * d.standard_rate));
//	frappe.model.set_value(d.doctype, d.name, "amount", (d.rate * d.qty));
		var pos_item_table = frm.doc.pos_item_table;
	  	var net_total = 0;
			for (var i in pos_item_table){
				net_total = net_total + pos_item_table[i].amount;
				cur_frm.set_value("net_total",net_total);
				cur_frm.set_value("grand_total",net_total);
			}
});

frappe.ui.form.on("POS Item Table", "rate", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	frappe.model.set_value(d.doctype, d.name, "amount", (d.rate * d.qty));
		var pos_item_table = frm.doc.pos_item_table;
  		var net_total = 0;
			for (var i in pos_item_table){
				net_total = net_total + pos_item_table[i].amount;
				cur_frm.set_value("net_total",net_total);
				cur_frm.set_value("grand_total",net_total);
			}
});

frappe.ui.form.on("POS Item Table", "pos_item_table_remove", function(frm, cdt, cdn){

	cur_frm.refresh();
	cur_frm.refresh_fields();
	var d = locals[cdt][cdn];
	var pos_item_table = frm.doc.pos_item_table;
  	var net_total = 0;
		for (var i in pos_item_table){
			net_total = net_total + pos_item_table[i].amount;
			cur_frm.set_value("net_total",net_total);
			cur_frm.set_value("grand_total",net_total);
		}
});

frappe.ui.form.on('Smart POS', {
    refresh: function(frm) {
        if(frappe.session.user != 'Administrator'){

    frappe.call({
    "method": "smart_pos.smart_pos.doctype.smart_pos.smart_pos.getSettings",
        args: {
            user: frappe.session.user
    },
callback:function(r){
	var len=r.message.length;
	console.log(len)
	for (var i=0;i<len;i++){
		frm.set_value("customer",r.message[i][0]);
		frm.set_value("warehouse",r.message[i][1]);
		frm.set_value("cost_center",r.message[i][2]);
		frm.set_value("is_paid",r.message[i][3]);
		frm.set_value("update_stock",r.message[i][4]);
	}
	}
    });
  }
}
});

frappe.ui.form.on("POS Item Table",{
        "item" : function (frm, cdt, cdn){
	var d2 = locals[cdt][cdn];
	if(d2.item){
	frappe.call({
		"method": "smart_pos.smart_pos.doctype.smart_pos.smart_pos.getVAL_Rate",
		args: {
			item: d2.item
		},
		callback:function(r){
		frappe.model.set_value(d2.doctype, d2.name, "valuation_rate", r.message);
}
});
}
}
});

frappe.ui.form.on('Smart POS',  {
    discount: function(frm) {
	var total = (frm.doc.grand_total -(frm.doc.net_total * (frm.doc.discount / 100)))
	frm.set_value("grand_total",total)
    }
});


frappe.ui.form.on("Smart POS", "onload", function(frm){
cur_frm.fields_dict['pos_item_table'].grid.get_field('item').get_query = function(doc) {
        return {
            filters: [[
                'Item', 'item_group', 'in', frm.doc.item_group
            	     ]]
           	};
    	};
});
