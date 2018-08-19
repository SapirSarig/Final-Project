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
        Negotiation()
        {
            Messages = new HashSet<Message>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public Offer Offer { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}
