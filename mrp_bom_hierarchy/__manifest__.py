{
    'name': 'MRP BoM hierarchy view',
    'version': '1.0',
    'category': 'Manufacturing',
    'summary': 'BoM Hierarchy View',
    'author': 'Veronika Kotovich (veronika.kotovich@gmail.com)',
    'depends': ['mrp'],
    'data': [
        'views/assets.xml',
        'views/mrp_bom_views.xml',
    ],
    'qweb' : [
        'static/src/xml/*.xml',
    ],
}