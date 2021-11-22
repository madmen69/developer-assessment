using FluentValidation;
using TodoList.Api.Models;

namespace TodoList.Api.Validations
{
    public class TodoItemValidation : AbstractValidator<TodoItem>
    {
        private static readonly string IdRequired = "Id is required";
        private static readonly string DescriptionRequired = "Description is required";
        private static readonly string IsCompletedRequired = "IsComplete is required";

        public TodoItemValidation()
        {
            RuleFor(x => x.Id).NotNull().WithMessage(IdRequired);
            RuleFor(x => x.Description).NotEmpty().WithMessage(DescriptionRequired);
            RuleFor(x => x.IsCompleted).NotNull().WithMessage(IsCompletedRequired);
        }
    }
}