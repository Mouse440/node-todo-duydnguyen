angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			update : function(data) {
				return $http.post('/api/update', data);
			},
			deleteTodo: function(data) {
				return $http.post('/api/delete', data);
			}

		}
	}]);
