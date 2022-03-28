using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.DTO.Validators
{
    public class AccountCredentialsDTOValidator : AbstractValidator<AccountCredentialsDTO>
    {
        public AccountCredentialsDTOValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
