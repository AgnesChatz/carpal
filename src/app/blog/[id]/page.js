'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';

// Blog posts data (same as blog page)
const blogPosts = {
  1: {
    id: 1,
    title: 'Πώς το Carpooling Μειώνει το Ανθρακικό Αποτύπωμα',
    excerpt: 'Ανακαλύψτε πώς ο διαμοιρασμός διαδρομών μπορεί να μειώσει τις εκπομπές CO2 κατά 30% και να συμβάλει σε ένα πιο βιώσιμο μέλλον.',
    content: `
      <p>Σε μια εποχή όπου η κλιματική αλλαγή αποτελεί ένα από τα μεγαλύτερα προβλήματα της ανθρωπότητας, κάθε μικρή ενέργεια μετράει. Το carpooling είναι μία από τις πιο απλές και αποτελεσματικές λύσεις που μπορούμε να υιοθετήσουμε στην καθημερινότητά μας.</p>
      
      <h2>Τα νούμερα μιλούν από μόνα τους</h2>
      <p>Σύμφωνα με πρόσφατες μελέτες, ένα μέσο αυτοκίνητο εκπέμπει περίπου 120 γραμμάρια CO2 ανά χιλιόμετρο. Αν δύο άτομα μοιράζονται μια διαδρομή 20 χιλιομέτρων καθημερινά, εξοικονομούν συνολικά 48 κιλά CO2 το μήνα - ισοδυναμεί με τη φύτευση 2 δέντρων!</p>
      
      <h2>Η επίδραση στην πόλη</h2>
      <p>Στη Θεσσαλονίκη, υπολογίζεται ότι καθημερινά γίνονται πάνω από 500.000 μεμονωμένες διαδρομές με αυτοκίνητο. Αν ακόμα και το 10% αυτών των διαδρομών γινόταν με carpooling, θα μιλούσαμε για:</p>
      <ul>
        <li>Μείωση 25% στα επίπεδα ατμοσφαιρικής ρύπανσης</li>
        <li>Λιγότερη κίνηση στους δρόμους</li>
        <li>Μείωση του θορύβου στην πόλη</li>
        <li>Λιγότερη φθορά στους δρόμους</li>
      </ul>
      
      <h2>Το οικονομικό όφελος</h2>
      <p>Πέρα από το περιβαλλοντικό όφελος, το carpooling προσφέρει σημαντική εξοικονόμηση χρημάτων. Ένας οδηγός που μοιράζεται τη διαδρομή του με 2-3 επιβάτες μπορεί να εξοικονομήσει έως και €200 το μήνα σε καύσιμα και συντήρηση.</p>
      
      <h2>Το μέλλον είναι συνεργατικό</h2>
      <p>Με την ανάπτυξη της τεχνολογίας και την αυξανόμενη περιβαλλοντική συνείδηση, το carpooling αναδεικνύεται ως μία από τις πιο βιώσιμες λύσεις μετακίνησης. Είναι μια win-win κατάσταση για όλους: τους οδηγούς, τους επιβάτες, και το περιβάλλον.</p>
      
      <blockquote>
        "Κάθε διαδρομή που μοιραζόμαστε είναι ένα βήμα προς έναν πιο πράσινο κόσμο."
      </blockquote>
      
      <h2>Πώς να ξεκινήσετε</h2>
      <p>Ξεκινώντας με το carpal είναι πανεύκολο. Απλά δημιουργήστε το προφίλ σας, αναζητήστε διαδρομές που σας ενδιαφέρουν, και κλείστε τη θέση σας. Ή αν είστε οδηγός, δημοσιεύστε τη διαδρομή σας και βρείτε επιβάτες που μοιράζονται τον ίδιο προορισμό.</p>
      
      <p>Μαζί μπορούμε να κάνουμε τη Θεσσαλονίκη μια πιο πράσινη, πιο ήσυχη, και πιο φιλική πόλη για όλους.</p>
    `,
    image: '🌱',
    category: 'Περιβάλλον',
    author: 'Μαρία Κωνσταντίνου',
    authorRole: 'Environmental Scientist',
    date: '15 Φεβρουαρίου 2026',
    readTime: '5 λεπτά',
    likes: 234,
    comments: 18,
    featured: true,
  },
  2: {
    id: 2,
    title: '5 Συμβουλές για Ασφαλείς Διαδρομές',
    excerpt: 'Οδηγίες για να εξασφαλίσετε την ασφάλειά σας κατά τη χρήση υπηρεσιών carpooling.',
    content: `
      <p>Η ασφάλεια είναι η πρώτη μας προτεραιότητα στο carpal. Ακολουθήστε αυτές τις 5 συμβουλές για να εξασφαλίσετε ότι κάθε διαδρομή σας θα είναι ασφαλής και ευχάριστη.</p>
      
      <h2>1. Επαληθεύστε το προφίλ</h2>
      <p>Πριν κλείσετε μια διαδρομή, ελέγξτε το προφίλ του οδηγού ή του επιβάτη. Βεβαιωθείτε ότι έχει επαληθευμένο email και τηλέφωνο. Διαβάστε τις αξιολογήσεις από άλλους χρήστες - είναι ο καλύτερος δείκτης αξιοπιστίας.</p>
      
      <h2>2. Κοινοποιήστε τη διαδρομή</h2>
      <p>Χρησιμοποιήστε τη λειτουργία "Κοινοποίηση διαδρομής" για να στείλετε τα στοιχεία του οδηγού, του οχήματος και της διαδρομής σε έναν οικείο σας. Είναι ένα απλό βήμα που προσθέτει ένα επιπλέον επίπεδο ασφάλειας.</p>
      
      <h2>3. Συναντηθείτε σε δημόσιο χώρο</h2>
      <p>Για την πρώτη σας διαδρομή με κάποιον νέο, προτείνουμε να συναντηθείτε σε έναν δημόσιο, καλά φωτισμένο χώρο. Σταθμοί μετρό, πλατείες, ή εμπορικά κέντρα είναι ιδανικές επιλογές.</p>
      
      <h2>4. Εμπιστευτείτε το ένστικτό σας</h2>
      <p>Αν κάτι σας κάνει να νιώθετε άβολα, μην το αγνοήσετε. Έχετε πάντα το δικαίωμα να ακυρώσετε μια διαδρομή αν νιώθετε ότι κάτι δεν πάει καλά. Η ασφάλειά σας είναι πάνω από όλα.</p>
      
      <h2>5. Κρατήστε επαφή</h2>
      <p>Χρησιμοποιήστε το σύστημα μηνυμάτων του carpal για να επικοινωνείτε με τον οδηγό ή τους επιβάτες σας. Μην δίνετε προσωπικά στοιχεία (τηλέφωνο, διεύθυνση) πριν τη διαδρομή.</p>
      
      <blockquote>
        "Η ασφάλεια είναι συνεργασία. Μαζί δημιουργούμε μια κοινότητα εμπιστοσύνης."
      </blockquote>
      
      <h2>Τι κάνουμε εμείς</h2>
      <p>Στο carpal, έχουμε υλοποιήσει πολλαπλά επίπεδα ασφάλειας:</p>
      <ul>
        <li>Επαλήθευση στοιχείων όλων των χρηστών</li>
        <li>Σύστημα αξιολογήσεων και κριτικών</li>
        <li>Δυνατότητα αναφοράς προβληματικής συμπεριφοράς</li>
        <li>Υποστήριξη 24/7 για επείγοντα περιστατικά</li>
        <li>Ασφάλεια δεδομένων και κρυπτογράφηση</li>
      </ul>
      
      <p>Με αυτές τις συμβουλές και τα μέτρα ασφάλειας που έχουμε θεσπίσει, μπορείτε να απολαύσετε το carpooling με πλήρη ηρεμία. Καλές διαδρομές!</p>
    `,
    image: '🛡️',
    category: 'Ασφάλεια',
    author: 'Γιάννης Παπαδόπουλος',
    authorRole: 'Safety Director',
    date: '10 Φεβρουαρίου 2026',
    readTime: '4 λεπτά',
    likes: 189,
    comments: 12,
    featured: false,
  },
  3: {
    id: 3,
    title: 'Η Οικονομία του Carpooling: Πόσα Χρήματα Εξοικονομείτε;',
    excerpt: 'Ανάλυση του κόστους μετακίνησης και πώς το carpooling μπορεί να μειώσει τα έξοδά σας έως και 60%.',
    content: `
      <p>Σε μια εποχή όπου το κόστος ζωής ανεβαίνει συνεχώς, το carpooling προσφέρει μια έξυπνη λύση για να εξοικονομήσετε χρήματα χωρίς να θυσιάσετε την άνεση της μετακίνησής σας.</p>
      
      <h2>Υπολογίζοντας το κόστος</h2>
      <p>Ας δούμε ένα πρακτικό παράδειγμα. Ένας οδηγός που κάνει καθημερινά τη διαδρομή Θεσσαλονίκη - Καλαμαριά (περίπου 15 χιλιόμετρα μετ' επιστροφής) ξοδεύει:</p>
      <ul>
        <li>Καύσιμα: €8-10 ημέρα = €160-200/μήνα</li>
        <li>Συντήρηση: €50/μήνα (φθορά, λάδια, λάστιχα)</li>
        <li>Ασφάλεια: €30/μήνα</li>
        <li>Χρήση parking: €40/μήνα</li>
      </ul>
      <p><strong>Σύνολο: €280-320/μήνα</strong></p>
      
      <h2>Με το carpal</h2>
      <p>Αν ο οδηγός μοιράζεται τη διαδρομή με 2 επιβάτες, εισπράττει περίπου €3-4 ανά διαδρομή από τον καθένα. Αυτό σημαίνει:</p>
      <ul>
        <li>Έσοδα: €12-16/ημέρα = €240-320/μήνα</li>
        <li>Καθαρό κέρδος: €100-150/μήνα</li>
      </ul>
      
      <h2>Η οπτική του επιβάτη</h2>
      <p>Για τους επιβάτες, τα οφέλη είναι εξίσου σημαντικά. Ένας επιβάτης που χρησιμοποιεί καθημερινά το carpal για τη δουλειά του:</p>
      <ul>
        <li>Κόστος με λεωφορείο: €60/μήνα</li>
        <li>Κόστος με ταξί: €400+/μήνα</li>
        <li>Κόστος με carpal: €120-160/μήνα</li>
      </ul>
      <p>Εξοικονόμηση σε σχέση με το ταξί: <strong>60-70%</strong></p>
      
      <blockquote>
        "Το carpal δεν είναι απλώς φθηνότερο - είναι πιο άνετο και κοινωνικό."
      </blockquote>
      
      <h2>Επιπλέον οφέλη</h2>
      <p>Πέρα από την άμεση εξοικονόμηση χρημάτων:</p>
      <ul>
        <li>Λιγότερο stress από την οδήγηση</li>
        <li>Χρόνος για διάβασμα ή ξεκούραση</li>
        <li>Δικτύωση και νέες γνωριμίες</li>
        <li>Συνεισφορά στο περιβάλλον</li>
      </ul>
      
      <h2>Υπολογίστε τα δικά σας</h2>
      <p>Χρησιμοποιήστε την εφαρμογή μας για να δείτε πόσα μπορείτε να εξοικονομήσετε. Απλά εισάγετε τη διαδρομή σας και δείτε άμεσα:</p>
      <ul>
        <li>Εκτιμώμενο κόστος καυσίμων</li>
        <li>Δυνατά έσοδα ως οδηγός</li>
        <li>Εξοικονόμηση ως επιβάτης</li>
      </ul>
      
      <p>Ξεκινήστε σήμερα και δείτε τη διαφορά στον προϋπολογισμό σας!</p>
    `,
    image: '💰',
    category: 'Οικονομία',
    author: 'Νίκος Ανδρέου',
    authorRole: 'Financial Analyst',
    date: '5 Φεβρουαρίου 2026',
    readTime: '6 λεπτά',
    likes: 312,
    comments: 24,
    featured: false,
  },
  4: {
    id: 4,
    title: 'Νέα Χαρακτηριστικά: Ladies Only Διαδρομές',
    excerpt: 'Παρουσιάζουμε το νέο μας χαρακτηριστικό που επιτρέπει σε γυναίκες οδηγούς και επιβάτες να ταξιδεύουν με άνεση.',
    content: `
      <p>Στο carpal, ακούμε πάντα τις ανάγκες της κοινότητάς μας. Ένα από τα πιο συχνά αιτήματα που λαμβάναμε ήταν η δυνατότητα για διαδρομές μόνο με γυναίκες. Σήμερα, χαιρόμαστε που ανακοινώνουμε το νέο χαρακτηριστικό "Ladies Only"!</p>
      
      <h2>Τι είναι το Ladies Only;</h2>
      <p>Το Ladies Only είναι μια προαιρετική ρύθμιση που επιτρέπει:</p>
      <ul>
        <li>Στις γυναίκες οδηγούς να δέχονται μόνο γυναίκες επιβάτες</li>
        <li>Στις γυναίκες επιβάτες να αναζητούν διαδρομές μόνο με γυναίκες οδηγούς</li>
        <li>Δημιουργία μιας ασφαλέστερης και πιο άνετης εμπειρίας</li>
      </ul>
      
      <h2>Πώς λειτουργεί</h2>
      <p>Η ενεργοποίηση είναι πανεύκολη:</p>
      <ol>
        <li>Πηγαίνετε στις ρυθμίσεις του προφίλ σας</li>
        <li>Ενεργοποιήστε την επιλογή "Ladies Only"</li>
        <li>Η προτίμησή σας αποθηκεύεται αυτόματα</li>
      </ol>
      
      <h2>Γιατί το κάναμε</h2>
      <p>Σύμφωνα με έρευνες που διεξήγαμε:</p>
      <ul>
        <li>68% των γυναικών χρηστών αισθάνονται πιο άνετα με γυναίκες οδηγούς</li>
        <li>45% των γυναικών οδηγών προτιμούν γυναίκες επιβάτες</li>
        <li>Το αίτημα ήταν από τα top 3 που λάβαμε</li>
      </ul>
      
      <blockquote>
        "Η ασφάλεια και η άνεση των χρηστών μας είναι προτεραιότητα. Το Ladies Only είναι ένα βήμα προς αυτή την κατεύθυνση."
      </blockquote>
      
      <h2>Δεν είναι διακριτικό;</h2>
      <p>Αυτή είναι μια προαιρετική επιλογή, όχι υποχρεωτική. Οι χρήστριες που δεν ενδιαφέρονται μπορούν απλά να μην την ενεργοποιήσουν. Στόχος μας είναι να προσφέρουμε επιλογές, όχι να περιορίσουμε κανέναν.</p>
      
      <h2>Τι έρχεται μετά</h2>
      <p>Εργαζόμαστε ήδη σε επιπλέον χαρακτηριστικά ασφάλειας:</p>
      <ul>
        <li>Κοινοποίηση διαδρομής σε πραγματικό χρόνο</li>
        <li>Κουμπί πανικού στην εφαρμογή</li>
        <li>24/7 τηλεφωνική γραμμή υποστήριξης</li>
      </ul>
      
      <p>Μείνετε συντονισμένοι για περισσότερες ανακοινώσεις!</p>
    `,
    image: '✨',
    category: 'Νέα',
    author: 'Ελένη Δημητρίου',
    authorRole: 'Product Manager',
    date: '1 Φεβρουαρίου 2026',
    readTime: '3 λεπτά',
    likes: 456,
    comments: 67,
    featured: false,
  },
  5: {
    id: 5,
    title: 'Η Ιστορία της Θεσσαλονίκης Μέσα από Διαδρομές',
    excerpt: 'Ανακαλύψτε κρυμμένα μυστικά της πόλης μέσα από ενδιαφέρουσες διαδρομές carpooling.',
    content: `
      <p>Η Θεσσαλονίκη είναι μια πόλη με πλούσια ιστορία 2.300 ετών. Κάθε δρόμος, κάθε γωνιά έχει μια ιστορία να πει. Σήμερα σας προτείνουμε μερικές διαδρομές που συνδυάζουν την πρακτικότητα του carpooling με την ανακάλυψη της πόλης.</p>
      
      <h2>Διαδρομή 1: Από το κέντρο στην Καλαμαριά</h2>
      <p>Αυτή η διαδρομή σας περνά δίπλα από:</p>
      <ul>
        <li>Τον Λευκό Πύργο - το σύμβολο της πόλης</li>
        <li>Την παραλία με θέα στον Θερμαϊκό</li>
        <li>Το Μέγαρο Μουσικής</li>
        <li>Το Κέντρο Συμβατών Υπολογιστών - πρώην σφαγεία</li>
      </ul>
      <p><strong>Tip:</strong> Ζητήστε από τον οδηγό να σας δείξει το σημείο με την καλύτερη θέα για φωτογραφίες!</p>
      
      <h2>Διαδρομή 2: Από το Πανεπιστήμιο στο κέντρο</h2>
      <p>Μια διαδρομή γεμάτη ιστορία:</p>
      <ul>
        <li>Η Πανεπιστημιούπολη - σχεδιασμένη από τους αρχιτέκτονες Τσάρα και Παπαϊωάννου</li>
        <li>Το Πανεπιστήμιο Μακεδονίας</li>
        <li>Η Εγνατία με τα νεοκλασικά κτίρια</li>
        <li>Η Πλατεία Αριστοτέλους</li>
      </ul>
      
      <h2>Διαδρομή 3: Προς τα δυτικά προάστια</h2>
      <p>Ανακαλύψτε λιγότερο γνωστά μέρη:</p>
      <ul>
        <li>Την Παλιά Βόρεια Σιδηροδρομική Γραμμή</li>
        <li>Το Μουσείο Σιδηροδρόμων</li>
        <li>Τα παλιά εργοστάσια που μετατρέπονται σε χώρους τέχνης</li>
      </ul>
      
      <blockquote>
        "Κάθε διαδρομή είναι μια ευκαιρία να μάθεις κάτι καινούριο για την πόλη σου."
      </blockquote>
      
      <h2>Η κοινότητα μοιράζεται</h2>
      <p>Πολλοί οδηγοί του carpal είναι ντόπιοι που αγαπούν να μοιράζονται ιστορίες για την πόλη. Μην διστάσετε να ρωτήσετε:</p>
      <ul>
        <li>Ποιο είναι το αγαπημένο τους στέκι για καφέ;</li>
        <li>Πού βρίσκεται το καλύτερο φαγητό στην περιοχή;</li>
        <li>Υπάρχει κάποιο κρυμμένο μυστικό της γειτονιάς;</li>
      </ul>
      
      <h2>Προτείνετε τη δική σας διαδρομή</h2>
      <p>Ξέρετε κάποια ενδιαφέρουσα διαδρομή; Μοιραστείτε την με την κοινότητα! Στείλτε μας τις προτάσεις σας και θα τις συμπεριλάβουμε στον οδηγό μας.</p>
      
      <p>Η Θεσσαλονίκη περιμένει να την ανακαλύψετε. Καλές διαδρομές!</p>
    `,
    image: '🏛️',
    category: 'Πολιτισμός',
    author: 'Μαρία Κωνσταντίνου',
    authorRole: 'City Guide',
    date: '25 Ιανουαρίου 2026',
    readTime: '7 λεπτά',
    likes: 178,
    comments: 23,
    featured: false,
  },
  6: {
    id: 6,
    title: 'Οδηγός για Νέους Οδηγούς: Πώς να Ξεκινήσετε',
    excerpt: 'Όλα όσα πρέπει να ξέρετε για να ξεκινήσετε ως οδηγός στο carpal και να μεγιστοποιήσετε τα έσοδά σας.',
    content: `
      <p>Σκεφτήκατε να γίνετε οδηγός στο carpal αλλά δεν ξέρετε από πού να ξεκινήσετε; Αυτός ο οδηγός θα σας δώσει όλες τις πληροφορίες που χρειάζεστε για να ξεκινήσετε με το δεξί πόδι.</p>
      
      <h2>Βήμα 1: Ολοκληρώστε το προφίλ σας</h2>
      <p>Ένα πλήρες προφίλ αυξάνει τις πιθανότητες κράτησης κατά 70%. Φροντίστε να:</p>
      <ul>
        <li>Προσθέσετε μια καθαρή φωτογραφία προσώπου</li>
        <li>Συμπληρώσετε μια σύντομη βιογραφία</li>
        <li>Επαληθεύσετε email και τηλέφωνο</li>
        <li>Προσθέσετε στοιχεία οχήματος με φωτογραφία</li>
      </ul>
      
      <h2>Βήμα 2: Δημιουργήστε την πρώτη σας διαδρομή</h2>
      <p>Ξεκινήστε με διαδρομές που κάνετε τακτικά:</p>
      <ul>
        <li>Διαδρομή για δουλειά</li>
        <li>Διαδρομή για σχολείο/φροντιστήριο</li>
        <li>Τακτικές επισκέψεις σε συγγενείς</li>
      </ul>
      <p>Η συνέπεια είναι το κλειδί - οι τακτικές διαδρομές χτίζουν κοινότητα.</p>
      
      <h2>Βήμα 3: Ορίστε ανταγωνιστική τιμή</h2>
      <p>Η τιμολόγηση είναι σημαντική. Συμβουλές:</p>
      <ul>
        <li>Ελέγξτε τις τιμές άλλων οδηγών για παρόμοιες διαδρομές</li>
        <li>Ξεκινήστε λίγο χαμηλότερα για να κερδίσετε τις πρώτες αξιολογήσεις</li>
        <li>Προσφέρετε εκπτώσεις για συχνούς επιβάτες</li>
      </ul>
      
      <h2>Βήμα 4: Να είστε επαγγελματίας</h2>
      <p>Η συμπεριφορά σας καθορίζει τις αξιολογήσεις:</p>
      <ul>
        <li>Να είστε πάντα στην ώρα σας</li>
        <li>Κρατήστε το αυτοκίνητο καθαρό</li>
        <li>Σεβαστείτε τις προτιμήσεις των επιβατών (μουσική, AC)</li>
        <li>Οδηγήστε με ασφάλεια</li>
      </ul>
      
      <blockquote>
        "Οι καλύτεροι οδηγοί είναι αυτοί που κάνουν τον επιβάτη να νιώθει σαν καλεσμένος, όχι σαν πελάτης."
      </blockquote>
      
      <h2>Βήμα 5: Αυξήστε τα έσοδά σας</h2>
      <p>Συμβουλές για περισσότερες κρατήσεις:</p>
      <ul>
        <li>Δημιουργήστε διαδρομές για δημοφιλείς ώρες (πρωί, απόγευμα)</li>
        <li>Προσφέρετε ευελιξία στο χρόνο (±15 λεπτά)</li>
        <li>Απαντήστε γρήγορα στα μηνύματα</li>
        <li>Ζητήστε αξιολογήσεις από ικανοποιημένους επιβάτες</li>
      </ul>
      
      <h2>Συχνές ερωτήσεις νέων οδηγών</h2>
      <p><strong>Πότε πληρώνομαι;</strong><br>
      Τα χρήματα κατατίθενται στον λογαριασμό σας 24-48 ώρες μετά την ολοκλήρωση της διαδρομής.</p>
      
      <p><strong>Τι γίνεται αν ο επιβάτης δεν εμφανιστεί;</strong><br>
      Αν δεν εμφανιστεί εντός 10 λεπτών, λαμβάνετε το 50% της κράτησης ως αποζημίωση.</p>
      
      <p><strong>Πρέπει να πληρώσω φόρους;</strong><br>
      Συμβουλευτείτε τον λογιστή σας. Τα έσοδα από carpooling συνήθως θεωρούνται συμπληρωματικά.</p>
      
      <p>Ξεκινήστε σήμερα και γίνετε μέρος της κοινότητάς μας!</p>
    `,
    image: '🚗',
    category: 'Οδηγοί',
    author: 'Γιάννης Παπαδόπουλος',
    authorRole: 'Community Manager',
    date: '20 Ιανουαρίου 2026',
    readTime: '8 λεπτά',
    likes: 267,
    comments: 31,
    featured: false,
  },
};

const relatedPosts = [2, 3, 4];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id);
  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="min-h-screen grain-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Το άρθρο δεν βρέθηκε</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Επιστροφή στο Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Επιστροφή στο Blog
            </Link>

            {/* Category */}
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm">{post.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} ανάγνωσης
              </div>
            </div>

            {/* Featured Image */}
            <div className="h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center text-8xl md:text-9xl">
              {post.image}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-8"
            >
              <article 
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{post.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #carpal
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #Θεσσαλονίκη
                </span>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 mt-8">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{post.comments} σχόλια</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span className="font-medium">Αποθήκευση</span>
                </button>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Share */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Μοιραστείτε
                </h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Σχετικά άρθρα</h3>
                <div className="space-y-4">
                  {relatedPosts
                    .filter(id => id !== postId)
                    .slice(0, 3)
                    .map(id => {
                      const relatedPost = blogPosts[id];
                      if (!relatedPost) return null;
                      return (
                        <Link
                          key={id}
                          href={`/blog/${id}`}
                          className="flex gap-4 group"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {relatedPost.image}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {relatedPost.readTime}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Μείνετε ενημερωμένοι</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Εγγραφείτε για να λαμβάνετε τα νέα μας.
                </p>
                <input
                  type="email"
                  placeholder="Το email σας"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
                />
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                  Εγγραφή
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
