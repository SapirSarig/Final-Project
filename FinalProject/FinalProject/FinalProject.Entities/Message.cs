using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public DateTime TimeSent { get; set; }

        public string Text { get; set; }

        public int ChatId { get; set; }
        [ForeignKey("ChatId")]
        public virtual Chat Chat { get; set; }
    }
}
