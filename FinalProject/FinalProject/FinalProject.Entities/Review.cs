using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string From { get; set; }
        public string TimeSent { get; set; }
        public int ByUserId { get; set; }

    }
}
