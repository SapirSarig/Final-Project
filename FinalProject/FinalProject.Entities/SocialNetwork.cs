using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public abstract class SocialNetwork
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public int Name { get; set; }

        [Required]
        public int Link { get; set; }
        //...
    }
}
