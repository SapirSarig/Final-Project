using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Chat
    {
        public Chat()
        {
            Messages = new HashSet<Message>();
        }

        [Key]
        public int Id { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

        //public virtual ICollection<UserChat> UsersChats { get; set; }

        public int? OfferId { get; set; }
        [ForeignKey("OfferId")]
        public virtual Offer Offer { get; set; }

    }
}
