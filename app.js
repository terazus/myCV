(function(){

    let my_app = angular.module('curriculumApp',
        ['ngRoute', 'ngAria', 'ngAnimate', 'ngMessages']);

    my_app.controller('FrontController', ['$http', '$sce',
        function($http, $sce) {

            let curriculum_data = this;
            curriculum_data.data_input = "data.json";
            $http.get(curriculum_data.data_input).then(function(response){
                curriculum_data.data = response.data;
                curriculum_data.data_en = response.data
                curriculum_data.data_en['Personal']['Description']['desc'] = $sce.trustAsHtml(response.data['Personal']['Description']['desc'])

            }).then(function(){
                $http.get("data-fr.json").then(function(response){
                    curriculum_data.data_fr = response.data;
                    curriculum_data.data_fr['Personal']['Description']['desc'] = $sce.trustAsHtml(response.data['Personal']['Description']['desc'])
                })
            });
        }
    ]);

    my_app.directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function($scope, element, attrs){
                $scope.$watch(element,
                    function(){
                        if(element)
                            element.hover(function(){
                                // on mouseenter
                                console.log(element.tooltip());
                                element.tooltip('show');
                            }, function(){
                                // on mouseleave
                                element.tooltip('hide');
                            });
                    }
                );


            }
        };
    });


    my_app.directive('navBar', function(){
        return{
            restrict: 'A',
            templateUrl: 'inc/navBar.html',
            scope: {
                navBar: '=',
            },
            link: function($scope){
                $scope.$watch('navBar',
                    function(navBar){
                        if(navBar)
                            $scope.data_path = $scope.navBar;
                    }
                );
            }
        }
    });

    my_app.directive('subSection', function(){
        return{
            restrict: 'A',
            templateUrl: 'inc/subSection.html',
            scope: {
                subSection: '=',
            },
            link: function($scope){
                $scope.$watch('subSection',
                    function(subSection){
                        if(subSection)
                            $scope.data = $scope.subSection;
                    }
                );
            }
        }
    });


})();