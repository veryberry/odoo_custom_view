odoo.define('mrp.mrp_bom_hierarchy', function (require) {
"use strict";

var core = require('web.core');
var View = require('web.View');
var Model = require('web.DataModel');

var QWeb = core.qweb;

var HierarchyView = View.extend({
    icon: 'fa-code-fork',
    display_name: 'Hierarchy',
    multi_record: false,
    searchable: false,
    do_show: function (options) {
        this.$el.html('');
        var model = new Model(this.dataset.model);
        var self = this;
        this.dataset.read_index(['bom_line_ids']).then(function(r) {
            self.add_component(r.bom_line_ids, self.$el);
        });
    },
    add_component: function(bom_lines, $el) {
        var self = this;        
        var bom_line_m = new Model('mrp.bom.line');
        var product_m = new Model('product.product')
        _.each(bom_lines, function(id) {
            bom_line_m.call('read', [id, ['product_id', 'product_qty']]).then(function(l){
                $el.append(QWeb.render('HierarchyView.Component', {
                    'name': l[0]['product_id'][1],
                    'qty': l[0]['product_qty'],
                    'id': 'comp'+l[0]['id'],
                }));
                product_m.call('read', [l[0]['product_id'][0], ['product_tmpl_id']]).then(function(p){
                    self.dataset.call('search_read', [[['product_tmpl_id','=',p[0]['product_tmpl_id'][0]]], ['bom_line_ids']])
                    .then(function(b){
                        if (b.length > 0) {
                            self.add_component(b[0]['bom_line_ids'], self.$('#comp'+l[0]['id']));
                        }
                    });
                })

                
            });

        });
    }
});

core.view_registry.add('hierarchy', HierarchyView);
    
});