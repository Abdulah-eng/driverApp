import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DocumentUploadScreen = ({navigation}: any) => {
  const [documents, setDocuments] = useState([
    {
      id: '1',
      type: 'Driver License',
      status: 'verified',
      uploadDate: '2024-01-01',
    },
    {
      id: '2',
      type: 'Vehicle Registration',
      status: 'pending',
      uploadDate: '2024-01-10',
    },
    {
      id: '3',
      type: 'Insurance',
      status: 'rejected',
      uploadDate: '2024-01-05',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'rejected':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return 'check-circle';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'error';
      default:
        return 'help';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Icon name="info-outline" size={24} color="#007AFF" />
          <Text style={styles.infoText}>
            Upload all required documents to start driving. Documents are
            reviewed within 24-48 hours.
          </Text>
        </View>

        {documents.map((doc, index) => (
          <TouchableOpacity
            key={doc.id}
            style={[
              styles.documentCard,
              index === documents.length - 1 && styles.lastCard,
            ]}>
            <View style={styles.documentIcon}>
              <Icon name="description" size={32} color="#007AFF" />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentType}>{doc.type}</Text>
              <Text style={styles.documentDate}>
                Uploaded: {doc.uploadDate}
              </Text>
            </View>
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: `${getStatusColor(doc.status)}20`},
              ]}>
              <Icon
                name={getStatusIcon(doc.status)}
                size={20}
                color={getStatusColor(doc.status)}
              />
              <Text
                style={[styles.statusText, {color: getStatusColor(doc.status)}]}>
                {doc.status.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="cloud-upload" size={24} color="#007AFF" />
          <Text style={styles.uploadButtonText}>Upload New Document</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastCard: {
    marginBottom: 16,
  },
  documentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  documentDate: {
    fontSize: 14,
    color: '#666666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
});

export default DocumentUploadScreen;
