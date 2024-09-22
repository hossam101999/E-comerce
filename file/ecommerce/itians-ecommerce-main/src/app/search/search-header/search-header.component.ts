import { Component } from '@angular/core';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.css'
})
export class SearchHeaderComponent {
  onSortChange(event: any) {
    const sortBy = event.target.value;
    console.log('Sort by:', sortBy);
    // يمكنك إضافة منطق الترتيب هنا
  }

  onSizeChange(event: any) {
    const size = event.target.value;
    console.log('Selected size:', size);
    // يمكنك إضافة منطق تعديل العرض هنا
  }
}
