using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace FinalProject.Entities
{
    //Base class for InfluencerUser and AdvertiserUser
    public abstract class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        //[RegularExpression(@.......)]
        public string Email { get; set; }

        [Required, MinLength(6)]
        //[RegularExpression(@.......)]
        public string Password { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }
    }
}
