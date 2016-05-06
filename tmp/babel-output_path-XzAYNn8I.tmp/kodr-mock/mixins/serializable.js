define('kodr-mock/mixins/serializable', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Mixin.create({
        serialize: function serialize() {
            var propertyNames = this.get('propertyNames') || [];
            return this.getProperties(propertyNames);
        },

        deserialize: function deserialize(hash) {
            this.setProperties(hash);
        }
    });
});