using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}$", ErrorMessage = "Password must be complex(length 4-16 symbols, contain digits, small and big letters).")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}