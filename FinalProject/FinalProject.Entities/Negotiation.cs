using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Negotiation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Offer Offer { get; set; }

        public IList<Message> Messages { get; set; }
    }
}
