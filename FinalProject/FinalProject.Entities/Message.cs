using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
    }
}
