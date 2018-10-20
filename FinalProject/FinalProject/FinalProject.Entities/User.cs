using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public abstract class User
    {
        public User()
        {
            Interests = new HashSet<Interest>();
            Reviews = new HashSet<Review>();
            RateByUsers = new HashSet<RateBy>();
            ReviewByUsers = new HashSet<ReviewBy>();
        }
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required, MinLength(6)]
        public string Password { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public string Question1 { get; set; }

        public string Question2 { get; set; }

        public int Stars { get; set; }

        public int NumOfVoters { get; set; }

        public double RateAvg { get; set; }

        public int FiveStars { get; set; }
        public int FourStars { get; set; }
        public int ThreeStars { get; set; }
        public int TwoStars { get; set; }
        public int OneStar { get; set; }

        public virtual ICollection<Interest> Interests { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<UserChat> UsersChats { get; set; }

        public virtual ICollection<ReviewBy> ReviewByUsers { get; set; }

        public virtual ICollection<RateBy> RateByUsers { get; set; }

    }
}
