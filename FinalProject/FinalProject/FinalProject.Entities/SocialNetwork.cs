using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class SocialNetwork
    {

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string LinkToProfile { get; set; }

        public virtual int UserId { get; set; }
    }
}
