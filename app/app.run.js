run.$inject = [
    '$rootScope',
    '$location',
    '$timeout',
    '$state'
];

export default function run ( $rootScope, $location, $timeout, $state ){
    window.requestAnimationFrame = window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function( callback ){
                                        return $timeout(callback, 1)
                                   }

    window.cancelRequestAnimFrame = window.cancelAnimationFrame ||
                                    window.webkitCancelRequestAnimationFrame ||
                                    window.mozCancelRequestAnimationFrame ||
                                    window.oCancelRequestAnimationFrame ||
                                    window.msCancelRequestAnimationFrame ||
                                    clearTimeout
};
