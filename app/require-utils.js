module.exports = {
    requireAll: function requireAll( requireContext ){
        // console.log( requireContext.keys() )
        return requireContext.keys().map( requireContext );
    }
};
