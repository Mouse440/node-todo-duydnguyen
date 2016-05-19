angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todoDone = 0;

				for(var i = 0; i < data.length; i++) {
					if(data[i].done) 
						$scope.todoDone++;
				}
				
				$scope.todos = data;
				$scope.loading = false;


			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		$scope.update = function(data) {
			if(data.done) 
				$scope.todoDone++;
			else
				$scope.todoDone--;
			// console.log(data);
			Todos.update(data)
				.success(function(res){
					console.log(res);
				});
		}

		// Delete todo item
		$scope.delete = function(data) {
			$scope.loading = true; 	//show loading

			Todos.deleteTodo(data)
				.success(function(res){
					$scope.loading = false;	//turn off loading
					if(res.deleted == false) {
						alert(res);
					} else {
						$scope.todoDone--;
						$scope.todos = res;
					}
				});
		}

		// Delete todo item
		$scope.snooze = function(data) {
			data.snooze = !data.snooze;
			// $scope.loading = true; 	//show loading

			Todos.update(data)
				.success(function(res){
					$scope.loading = false;	//turn off loading
					console.log(res);
				});
		}

	}]);
