using Xunit;
using Moq;
using TodoList.Api.TodoItems;
using TodoList.Api.CustomExceptions;
using TodoList.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace TodoList.Api.UnitTests
{
    public class TodoItemsServiceTest
    {
        public Mock<ITodoItemsRepository> mock = new Mock<ITodoItemsRepository>();

        [Fact(DisplayName = "UpdateTodoItem - Not found")]
        public async void UpdateTodoItemNotFound()
        {
            // arrange
            var id = new Guid();
            var request = new TodoItem {
                    Id = id,
                    Description = "hello",
                    IsCompleted = false
                };

            mock.Setup(p => p.GetTodoItem(id)).ReturnsAsync((TodoItem)null);
            TodoItemsService service = new TodoItemsService(mock.Object);

            // act
            var ex = await Assert.ThrowsAsync<TodoItemNotFoundException>(async () => await service.UpdateTodoItem(id, request));

            // assert
            Assert.Equal(ex.Message, "Not found item");
        }

        [Fact(DisplayName = "CreateTodoItem - Description is required")]
        public async void CreateTodoItemEmptyDescription()
        {
            // arrange
            TodoItemsService service = new TodoItemsService(mock.Object);

            // act
            var ex = await Assert.ThrowsAsync<ValidationException>(async () => await service.CreateTodoItem(new TodoItem{
                Id = new Guid(),
                Description = "",
                IsCompleted = false
            }));

            // assert
            Assert.Equal(ex.Message, "Description is required");
        }

        [Fact(DisplayName = "CreateTodoItem - Description already Exist")]
        public async void CreateTodoItemDescriptionAlreadyExist()
        {
            // arrange
            var mockResponse = new List<TodoItem>
            {
                new TodoItem{
                    Id = new Guid(),
                    Description = "hello",
                    IsCompleted = false
                }
            };
            mock.Setup(p => p.GetAll(It.IsAny<Expression<Func<TodoItem, bool>>>())).ReturnsAsync( (IEnumerable<TodoItem>)mockResponse);
            TodoItemsService service = new TodoItemsService(mock.Object);

            // act
            var ex = await Assert.ThrowsAsync<ValidationException>(async () => await service.CreateTodoItem(new TodoItem{
                Id = new Guid(),
                Description = "hello",
                IsCompleted = false
            }));

            // assert
            Assert.Equal(ex.Message, "Todo item description is already in the list");
        }

        [Fact(DisplayName = "CreateTodoItem - Id already Exist")]
        public async void CreateTodoItemIdAlreadyExist()
        {
            // arrange
            var id = new Guid();
            var mockResponse = new TodoItem{
                Id = id,
                Description = "hello",
                IsCompleted = false
            };
            mock.Setup(p => p.GetTodoItem(It.IsAny<Guid>())).ReturnsAsync((TodoItem)mockResponse);
            TodoItemsService service = new TodoItemsService(mock.Object);

            // act
            var ex = await Assert.ThrowsAsync<ValidationException>(async () => await service.CreateTodoItem(new TodoItem{
                Id = id,
                Description = "hello",
                IsCompleted = false
            }));

            // assert
            Assert.Equal(ex.Message, "Todo item id is already in the list");
        }
    }
}