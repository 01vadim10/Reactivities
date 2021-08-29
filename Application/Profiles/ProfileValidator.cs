using FluentValidation;

namespace Application.Profiles
{
    public class ProfileValidator : AbstractValidator<UserDetails>
    {
        public ProfileValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}