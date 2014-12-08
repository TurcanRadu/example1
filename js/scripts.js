var Item = {
    add : function (item) {
        var items = Storage.get() || { items : [] };

        item.id = items.items.length;
        items.items.push(item);
        Storage.add(items);

        Template.compile( items );
    },

    remove : function (index) {
        var items = Storage.get();

        items.items.splice(index, 1);

        var reindexedItems = this.reindex( items.items );
        items.items = reindexedItems;
        Storage.add(items);

        Template.compile( items );
    },

    reindex : function (items) {
        for(var i = 0; i < items.length; i++) {
            items[i].id = i;
        }

        return items;
    }
};

var Storage = {
    id : 'app_example',

    add : function (data) {
        localStorage.setItem( this.id, JSON.stringify(data) );
    },

    get : function () {
        return JSON.parse( localStorage.getItem(this.id) );
    }
};

var Template = {
    compile : function (data) {
        var compiledTemplate = Mustache.render( jQuery('#item-template').html(), data );
        jQuery('.items-list tbody').html( compiledTemplate );
    }
};

jQuery(function () {
    Template.compile( Storage.get() );

    // remove item
    jQuery('.items-list').on('click', '.remove-item', function () {
        var index = jQuery(this).data('item-id');

        if(confirm("Delete Selected Item?")) {
            Item.remove(index);
        }
        return false;
    });

    // edit item

    // add item
});
